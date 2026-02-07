import { Canvas } from "@react-three/fiber";

export default function Test3D() {
  return (
    <Canvas
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,          // FORCE ON TOP
        background: "red",     // VISUAL PROOF
      }}
      camera={{ position: [0, 0, 5] }}
    >
      <ambientLight />
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="yellow" />
      </mesh>
    </Canvas>
  );
}
