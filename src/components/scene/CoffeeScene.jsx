import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, PerspectiveCamera, Sparkles } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function Cup() {
  const group = useRef()
  const { pointer } = useThree()
  useFrame((_, delta) => { group.current.rotation.y += delta * .13; group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.y * .08, .04); group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -pointer.x * .06, .04) })
  return <group ref={group}><mesh castShadow receiveShadow position={[0, -.52, 0]}><cylinderGeometry args={[1.52, 1.28, 1.02, 48]} /><meshStandardMaterial color="#c28a5b" roughness={.24} metalness={.04} /></mesh><mesh castShadow position={[0, -.01, 0]}><torusGeometry args={[1.27, .16, 24, 48]} /><meshStandardMaterial color="#d4a274" roughness={.2} /></mesh><mesh position={[0, .08, 0]}><cylinderGeometry args={[1.24, 1.24, .08, 48]} /><meshStandardMaterial color="#211510" roughness={.12} /></mesh><mesh position={[0, .13, 0]}><torusGeometry args={[.78, .025, 12, 48]} /><meshStandardMaterial color="#74462d" roughness={.18} /></mesh><mesh castShadow position={[1.5, -.35, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.43, .13, 20, 40]} /><meshStandardMaterial color="#bf8658" roughness={.24} /></mesh></group>
}

export default function CoffeeScene({ compact = false }) {
  return <div className={`scene ${compact ? 'scene-compact' : ''}`}><Canvas shadows dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}><PerspectiveCamera makeDefault position={[0, .5, 5.2]} fov={35} /><ambientLight intensity={1.2} /><directionalLight castShadow position={[3, 5, 4]} intensity={3.2} color="#ffd8ac" /><pointLight position={[-3, 1, 2]} intensity={1.2} color="#8d5031" /><Float speed={1.15} rotationIntensity={.12} floatIntensity={.3}><Cup /></Float><Sparkles count={compact ? 18 : 32} scale={[4.5, 3.8, 3]} size={1.5} speed={.25} color="#c18a5e" /></Canvas></div>
}
