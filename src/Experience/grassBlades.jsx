/* eslint-disable no-unused-vars */
import { useGLTF } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

const GrassBlades = () => {
    const grassBlades = useGLTF('/grassBlade.glb'); // Load grass blades model
    const instancedMeshRef = useRef();
    const count = 1000; // Number of grass blades

    const dummy = useMemo(() => new THREE.Object3D(), []);
    const positions = useMemo(() => {
        // Generate random positions in the XZ plane
        const pos = [];
        for (let i = 0; i < count; i++) {
            pos.push({
                x: Math.random() * 10 - 5, // Spread grass within a 10x10 area
                z: Math.random() * 10 - 5,
                y: -1, // Keep on the ground level
            });
        }
        return pos;
    }, [count]);

    useEffect(() => {
        if (instancedMeshRef.current) {
            positions.forEach((pos, i) => {
                dummy.position.set(pos.x, pos.y, pos.z);
                dummy.rotation.set(grassBlades.nodes.GrassBlade.rotation.x, grassBlades.nodes.GrassBlade.rotation.y, grassBlades.nodes.GrassBlade.rotation.z);
                dummy.scale.setScalar(1); // Slight random size variation
                dummy.updateMatrix();
                instancedMeshRef.current.setMatrixAt(i, dummy.matrix);
            });
            instancedMeshRef.current.instanceMatrix.needsUpdate = true;
        }
    }, [positions, dummy, grassBlades]);

    return (
        <instancedMesh geometry={grassBlades.nodes.GrassBlade.geometry} ref={instancedMeshRef} args={[null, null, count]}>
            <meshNormalMaterial side={THREE.DoubleSide} wireframe={false} />
        </instancedMesh>
    );
};

export default GrassBlades;
