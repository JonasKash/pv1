<template>
  <!--
    Persistent Three.js neural brain that lives behind every section.
    - Fixed canvas covering 100vw × 100vh
    - ~220 nodes arranged in a loose brain-lobe topology
    - Scroll drives a "synaptic activation" wave: nodes light up cyan
      as the user reads deeper into the page (GSAP ScrollTrigger)
    - Mouse parallax tilts the whole graph
    - A slow rotation keeps it alive when the user stops scrolling
  -->
  <canvas
    ref="canvasRef"
    class="brain-bg"
    aria-hidden="true"
    role="presentation"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)

let animId: number | null = null
let renderer: any, scene: any, camera: any
let gsapInstance: any, st: any

// ── Tuneable constants ─────────────────────────────────────────────
const NODE_COUNT   = 220
const CONNECT_DIST = 2.6   // max edge length
const BASE_COLOR_H = 0.72  // HSL hue for idle nodes (purple)
const ACTIVE_HUE   = 0.48  // HSL hue for activated nodes (teal)

// Per-node state
const nodeActive: Float32Array  = new Float32Array(NODE_COUNT) // 0 → 1 activation
const nodeVx: Float32Array      = new Float32Array(NODE_COUNT)
const nodeVy: Float32Array      = new Float32Array(NODE_COUNT)
const nodeVz: Float32Array      = new Float32Array(NODE_COUNT)

let THREE: any = null
let positions: THREE.BufferAttribute
let colors: THREE.BufferAttribute
let linePositions: THREE.BufferAttribute
let lineColors: THREE.BufferAttribute
let lineIndexPairs: [number, number][] = []
let nodePositions: THREE.Vector3[] = []

// Scroll progress 0 → 1
let scrollProgress = 0
let mouseX = 0, mouseY = 0

onMounted(async () => {
  const canvas = canvasRef.value
  if (!canvas || typeof window === 'undefined') return

  THREE = await import('three')

  // ── Scene setup ────────────────────────────────────────────────
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(55, canvas.clientWidth / canvas.clientHeight, 0.1, 500)
  camera.position.z = 14

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  renderer.setSize(canvas.clientWidth, canvas.clientHeight)
  renderer.setClearColor(0x000000, 0)

  // ── Build brain topology ──────────────────────────────────────
  // Two rough lobes + brainstem: nodes placed in an ellipsoidal shell
  // with some tighter clusters to mimic cortical regions.
  const rawPos: number[] = []
  nodePositions = []

  for (let i = 0; i < NODE_COUNT; i++) {
    const lobe = i < NODE_COUNT * 0.5 ? -1 : 1      // left / right
    const theta = Math.random() * Math.PI * 2
    const phi   = Math.random() * Math.PI
    const r     = 3.2 + Math.random() * 1.8          // radial noise

    const x = lobe * (1.8 + r * Math.sin(phi) * Math.cos(theta) * 0.9)
    const y =        (r * Math.sin(phi) * Math.sin(theta) * 0.65)
    const z =        (r * Math.cos(phi) * 0.55)

    rawPos.push(x, y, z)
    nodePositions.push(new THREE.Vector3(x, y, z))

    // Small random drift velocity
    nodeVx[i] = (Math.random() - 0.5) * 0.003
    nodeVy[i] = (Math.random() - 0.5) * 0.003
    nodeVz[i] = (Math.random() - 0.5) * 0.0015
  }

  // ── Node particles ─────────────────────────────────────────────
  const nodeGeo = new THREE.BufferGeometry()
  positions = new THREE.BufferAttribute(new Float32Array(rawPos), 3)
  colors    = new THREE.BufferAttribute(new Float32Array(NODE_COUNT * 3).fill(0), 3)
  nodeGeo.setAttribute('position', positions)
  nodeGeo.setAttribute('color',    colors)

  const nodeMat = new THREE.PointsMaterial({
    size: 0.1,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    sizeAttenuation: true,
  })

  scene.add(new THREE.Points(nodeGeo, nodeMat))

  // ── Edges ──────────────────────────────────────────────────────
  lineIndexPairs = []
  const linePosArr: number[] = []
  const lineColArr: number[] = []

  for (let i = 0; i < NODE_COUNT; i++) {
    for (let j = i + 1; j < NODE_COUNT; j++) {
      if (nodePositions[i].distanceTo(nodePositions[j]) < CONNECT_DIST) {
        lineIndexPairs.push([i, j])
        linePosArr.push(
          rawPos[i * 3], rawPos[i * 3 + 1], rawPos[i * 3 + 2],
          rawPos[j * 3], rawPos[j * 3 + 1], rawPos[j * 3 + 2],
        )
        lineColArr.push(0, 0, 0, 0, 0, 0) // will update each frame
      }
    }
  }

  const lineGeo = new THREE.BufferGeometry()
  linePositions = new THREE.BufferAttribute(new Float32Array(linePosArr), 3)
  lineColors    = new THREE.BufferAttribute(new Float32Array(lineColArr), 3)
  lineGeo.setAttribute('position', linePositions)
  lineGeo.setAttribute('color',    lineColors)

  scene.add(new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.22,
  })))

  // ── Mouse + scroll listeners ────────────────────────────────────
  const onMouse = (e: MouseEvent) => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2
  }

  const onScroll = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0
  }

  const onResize = () => {
    if (!canvas) return
    const w = canvas.clientWidth, h = canvas.clientHeight
    renderer.setSize(w, h)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }

  window.addEventListener('mousemove', onMouse, { passive: true })
  window.addEventListener('scroll',    onScroll, { passive: true })
  window.addEventListener('resize',    onResize)
  onUnmounted(() => {
    window.removeEventListener('mousemove', onMouse)
    window.removeEventListener('scroll',    onScroll)
    window.removeEventListener('resize',    onResize)
  })

  // ── Render loop ─────────────────────────────────────────────────
  let t = 0

  function hslToRgb(h: number, s: number, l: number): [number, number, number] {
    let r: number, g: number, b: number
    if (s === 0) { r = g = b = l } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1; if (t > 1) t -= 1
        if (t < 1/6) return p + (q - p) * 6 * t
        if (t < 1/2) return q
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
        return p
      }
      r = hue2rgb(p, q, h + 1/3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1/3)
    }
    return [r, g, b]
  }

  function animate() {
    animId = requestAnimationFrame(animate)
    t += 0.006

    // Scroll drives activation wave: nodes with index < scrollProgress * N get active
    const activeFront = scrollProgress * NODE_COUNT

    // Update node positions + colors
    for (let i = 0; i < NODE_COUNT; i++) {
      // Drift
      positions.array[i * 3]     += nodeVx[i]
      positions.array[i * 3 + 1] += nodeVy[i]
      positions.array[i * 3 + 2] += nodeVz[i]

      // Soft boundary — nudge back toward origin
      const ox = positions.array[i * 3]     as number
      const oy = positions.array[i * 3 + 1] as number
      const oz = positions.array[i * 3 + 2] as number
      if (Math.abs(ox) > 7) nodeVx[i] *= -1
      if (Math.abs(oy) > 4) nodeVy[i] *= -1
      if (Math.abs(oz) > 3) nodeVz[i] *= -1

      // Activation fade toward target
      const target = i < activeFront ? 1 : 0
      nodeActive[i] += (target - nodeActive[i]) * 0.025

      // Node pulse
      const pulse = 0.55 + Math.sin(t * 1.8 + i * 0.3) * 0.22

      // Color: interpolate purple → teal based on activation
      const a   = nodeActive[i]
      const hue = BASE_COLOR_H + (ACTIVE_HUE - BASE_COLOR_H) * a
      const sat = 0.7 + a * 0.2
      const lit = 0.35 + a * 0.3 + pulse * 0.08

      const [r, g, b] = hslToRgb(hue, sat, lit)
      colors.array[i * 3]     = r
      colors.array[i * 3 + 1] = g
      colors.array[i * 3 + 2] = b
    }
    positions.needsUpdate = true
    colors.needsUpdate    = true

    // Update edge colors from connected node averages
    for (let e = 0; e < lineIndexPairs.length; e++) {
      const [a, b] = lineIndexPairs[e]
      const ei = e * 6
      const ni = a * 3, nj = b * 3
      // copy node color to both endpoints of the edge
      linePositions.array[ei]     = positions.array[ni]
      linePositions.array[ei + 1] = positions.array[ni + 1]
      linePositions.array[ei + 2] = positions.array[ni + 2]
      linePositions.array[ei + 3] = positions.array[nj]
      linePositions.array[ei + 4] = positions.array[nj + 1]
      linePositions.array[ei + 5] = positions.array[nj + 2]

      const avgAct = (nodeActive[a] + nodeActive[b]) / 2
      const dim = 0.06 + avgAct * 0.2
      lineColors.array[ei]     = colors.array[ni] * dim
      lineColors.array[ei + 1] = colors.array[ni + 1] * dim
      lineColors.array[ei + 2] = colors.array[ni + 2] * dim
      lineColors.array[ei + 3] = colors.array[nj] * dim
      lineColors.array[ei + 4] = colors.array[nj + 1] * dim
      lineColors.array[ei + 5] = colors.array[nj + 2] * dim
    }
    linePositions.needsUpdate = true
    lineColors.needsUpdate    = true

    // Slow auto-rotation + mouse parallax
    scene.rotation.y += (mouseX * 0.18 + t * 0.025 - scene.rotation.y) * 0.04
    scene.rotation.x += (mouseY * 0.1  - scene.rotation.x) * 0.04

    renderer.render(scene, camera)
  }

  animate()
})

onUnmounted(() => {
  if (animId !== null) cancelAnimationFrame(animId)
  renderer?.dispose()
  scene?.clear()
})
</script>

<style scoped>
.brain-bg {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
  opacity: 0.55;
}
</style>
