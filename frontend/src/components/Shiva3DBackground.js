// import { Canvas, useFrame } from "@react-three/fiber";
// import { Sphere } from "@react-three/drei";
// import { useRef } from "react";

// function ShivaAura() {
//   const aura = useRef();

//   useFrame(({ clock }) => {
//     const t = clock.getElapsedTime();
//     aura.current.scale.setScalar(1 + Math.sin(t * 0.6) * 0.05);
//     aura.current.material.opacity = 0.35 + Math.sin(t * 0.6) * 0.05;
//   });

//   return (
//     <Sphere args={[3, 64, 64]} ref={aura}>
//       <meshStandardMaterial
//         color="#7dd3fc"
//         transparent
//         opacity={0.35}
//         emissive="#38bdf8"
//         emissiveIntensity={0.6}
//       />
//     </Sphere>
//   );
// }

// function EnergySpine() {
//   const spine = useRef();

//   useFrame(({ clock }) => {
//     spine.current.material.opacity =
//       0.4 + Math.sin(clock.getElapsedTime()) * 0.2;
//   });

//   return (
//     <mesh position={[0, 0, 0]}>
//       <cylinderGeometry args={[0.03, 0.03, 6, 32]} />
//       <meshStandardMaterial
//         color="#a855f7"
//         transparent
//         opacity={0.4}
//         emissive="#a855f7"
//         emissiveIntensity={0.8}
//       />
//     </mesh>
//   );
// }

// export default function Shiva3DBackground() {
//   return (
//     <div style={styles.wrapper}>
//       <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
//         <ambientLight intensity={0.3} />
//         <pointLight position={[0, 5, 5]} intensity={1} />

//         {/* Shiva Presence */}
//         <ShivaAura />

//         {/* Kundalini Axis */}
//         <EnergySpine />
//       </Canvas>
//     </div>
//   );
// }

// const styles = {
//   wrapper: {
//     position: "fixed",
//     inset: 0,
//     zIndex: 0,
//     background: "transparent",
//   },
// };


import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function ShivaForm() {
  return (
    <mesh rotation={[0, Math.PI, 0]}>
      {/* Head */}
      <sphereGeometry args={[0.6, 32, 32]} />
      <meshStandardMaterial color="#94a3b8" emissive="#0f172a" />
    </mesh>
  );
}

export default function Shiva3DBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3] }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -10,
      }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[2, 4, 2]} intensity={1} />

      {/* Shiva */}
      <group position={[0, -0.3, 0]}>
        <ShivaForm />
      </group>

      {/* Disable user rotation */}
      <OrbitControls enableZoom={false} enableRotate={false} />
    </Canvas>
  );
}
