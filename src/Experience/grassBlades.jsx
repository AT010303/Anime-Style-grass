/* eslint-disable no-unused-vars */
import { Sampler, useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { createNoise3D } from 'simplex-noise';
import * as THREE from 'three';

const GrassBlades = () => {
    const grassBlades = useGLTF('/grassBladeHLD.glb'); // Load grass blades model
    const land = useGLTF('/land.glb');
    const instancedMeshRef = useRef();
    const landRef = useRef();

    const noise = useMemo(() => createNoise3D(Math.random), []);
    const count = 5000; // Number of grass blades

    const { camera } = useThree();

    // Use frame loop to update grass blades' orientation
    useFrame(() => {
        if (!instancedMeshRef.current) return;

        const instancedMesh = instancedMeshRef.current;
        const dummy = new THREE.Object3D(); // Temporary object for updating matrix

        for (let i = 0; i < count; i++) {
            instancedMesh.getMatrixAt(i, dummy.matrix); // Get the current instance matrix
            dummy.position.setFromMatrixPosition(dummy.matrix); // Extract position

            // Calculate Y-axis rotation to face the camera
            const direction = new THREE.Vector3();
            direction.subVectors(camera.position, dummy.position).normalize();
            const angleY = Math.atan2(direction.x, direction.z);
            dummy.rotation.set(0, angleY , 0); // Set rotation only on Y-axis

            dummy.updateMatrix();
            instancedMesh.setMatrixAt(i, dummy.matrix); // Update the instance matrix
        }

        instancedMesh.instanceMatrix.needsUpdate = true; // Notify Three.js of matrix updates
    });

    return (
        <group position={[0, -5, 0]}>
            <mesh
                ref={landRef}
                receiveShadow
                castShadow
                geometry={land.nodes.land.geometry}
            >
                <meshStandardMaterial color="green" side={THREE.DoubleSide} />
            </mesh>
            <>
                <Sampler
                    weight="density"
                    count={count}
                    transform={({ position, normal, dummy: object }) => {
                        object.rotation.set(0, Math.random() * Math.PI * 2, 0);
                        object.position.copy(position);
                        return object;
                    }}
                    mesh={landRef}
                >
                    <instancedMesh
                        ref={instancedMeshRef}
                        receiveShadow
                        args={[
                            grassBlades.nodes.grassBlade.geometry,
                            null,
                            count
                        ]}
                    >
                        <meshStandardMaterial
                            color="lightgreen"
                            side={THREE.DoubleSide}
                        />
                    </instancedMesh>
                </Sampler>
            </>
        </group>
    );
};

export default GrassBlades;
