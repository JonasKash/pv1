<template>
  <canvas ref="canvasRef" class="hero-canvas" aria-hidden="true" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)

let animId: number | null = null
let renderer: any, scene: any, camera: any
let particles: any, lines: any

onMounted(async () => {
  const THREE = await import('three')
  const canvas = canvasRef.value
  if (!canvas) return

  // ── Scene ──────────────────────────────────────────────
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
  camera.position.z = 5

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(canvas.clientWidth, canvas.clientHeight)
  renderer.setClearColor(0x000000, 0)

  // ── Neural network nodes ───────────────────────────────
  const NODE_COUNT = 80
  const positions: number[] = []
  const nodeVelocities: THREE.Vector3[] = []

  for (let i = 0; i < NODE_COUNT; i++) {
    const x = (Math.random() - 0.5) * 10
    const y = (Math.random() - 0.5) * 6
    const z = (Math.random() - 0.5) * 4
    positions.push(x, y, z)
    nodeVelocities.push(new THREE.Vector3(
      (Math.random() - 0.5) * 0.004,
      (Math.random() - 0.5) * 0.004,
      (Math.random() - 0.5) * 0.002,
    ))
  }

  const nodeGeo = new THREE.BufferGeometry()
  nodeGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))

  const nodeMat = new THREE.PointsMaterial({
    color: 0x6c5ce7,
    size: 0.06,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
  })

  particles = new THREE.Points(nodeGeo, nodeMat)
  scene.add(particles)

  // ── Connection lines ───────────────────────────────────
  const CONNECT_DIST = 2.2
  const linePositions: number[] = []
  const nodeArr: THREE.Vector3[] = []

  for (let i = 0; i < NODE_COUNT; i++) {
    nodeArr.push(new THREE.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]))
  }

  for (let i = 0; i < NODE_COUNT; i++) {
    for (let j = i + 1; j < NODE_COUNT; j++) {
      if (nodeArr[i].distanceTo(nodeArr[j]) < CONNECT_DIST) {
        linePositions.push(
          nodeArr[i].x, nodeArr[i].y, nodeArr[i].z,
          nodeArr[j].x, nodeArr[j].y, nodeArr[j].z,
        )
      }
    }
  }

  const lineGeo = new THREE.BufferGeometry()
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))

  const lineMat = new THREE.LineSegmentsGeometry
    ? new (await import('three/addons/lines/LineSegmentsGeometry.js' as any)).LineSegmentsGeometry()
    : null

  lines = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({
    color: 0x6c5ce7,
    transparent: true,
    opacity: 0.12,
  }))
  scene.add(lines)

  // ── Ambient light pulse ────────────────────────────────
  const ambient = new THREE.AmbientLight(0x6c5ce7, 0.5)
  scene.add(ambient)

  // ── Mouse parallax ─────────────────────────────────────
  let mouseX = 0, mouseY = 0
  const onMouse = (e: MouseEvent) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2
    mouseY = -(e.clientY / window.innerHeight - 0.5) * 2
  }
  window.addEventListener('mousemove', onMouse)

  // ── Resize ─────────────────────────────────────────────
  const onResize = () => {
    if (!canvas) return
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    renderer.setSize(w, h)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  window.addEventListener('resize', onResize)

  // ── Render loop ────────────────────────────────────────
  let t = 0
  function animate() {
    animId = requestAnimationFrame(animate)
    t += 0.004

    // Drift nodes
    const pos = (particles.geometry.attributes.position as THREE.BufferAttribute)
    for (let i = 0; i < NODE_COUNT; i++) {
      const v = nodeVelocities[i]
      pos.array[i * 3] += v.x
      pos.array[i * 3 + 1] += v.y
      pos.array[i * 3 + 2] += v.z
      // Bounce
      if (Math.abs(pos.array[i * 3] as number) > 5) v.x *= -1
      if (Math.abs(pos.array[i * 3 + 1] as number) > 3) v.y *= -1
      if (Math.abs(pos.array[i * 3 + 2] as number) > 2) v.z *= -1
    }
    pos.needsUpdate = true

    // Pulse opacity
    nodeMat.opacity = 0.6 + Math.sin(t * 2) * 0.2

    // Mouse parallax on scene
    scene.rotation.y += (mouseX * 0.15 - scene.rotation.y) * 0.05
    scene.rotation.x += (mouseY * 0.08 - scene.rotation.x) * 0.05

    renderer.render(scene, camera)
  }

  animate()

  // Cleanup listeners on unmount
  onUnmounted(() => {
    window.removeEventListener('mousemove', onMouse)
    window.removeEventListener('resize', onResize)
  })
})

onUnmounted(() => {
  if (animId !== null) cancelAnimationFrame(animId)
  renderer?.dispose()
  scene?.clear()
})
</script>

<style scoped>
.hero-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
