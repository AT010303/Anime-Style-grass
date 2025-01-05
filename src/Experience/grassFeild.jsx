import * as THREE from "three";

const GrassFeild  = () => {
    return (
        <>
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
                <planeGeometry args={[10, 10, 100, 100]} />
                <meshBasicMaterial color="green" side={THREE.DoubleSide} wireframe={false} />
            </mesh>
        </>
    );
};

export default GrassFeild;