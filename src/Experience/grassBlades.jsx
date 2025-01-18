/* eslint-disable no-unused-vars */
import { Sampler, useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import perlin from 'perlin.js';
import { useMemo, useRef } from 'react';
import { createNoise3D } from 'simplex-noise';
import * as THREE from 'three';
import CustomShaderMaterial from 'three-custom-shader-material';

import grassBladeFragmentShader from './shader/grassBlade/fragment.glsl';
import grassBladeVertexShader from './shader/grassBlade/vertex.glsl';

const GrassBlades = () => {
    const grassBlades = useGLTF('/grassBlade3.glb'); // Load grass blades model
    const land = useGLTF('/land.glb');
    const instancedMeshRef = useRef();
    const landRef = useRef();
    const noise = useMemo(() => createNoise3D(Math.random), []);
    const count = 30000; // Number of grass blades

    const { camera } = useThree();
    // console.log('camera', camera);
    

    // Convert land geometry to non-indexed
    const landGeometry = useMemo(() => {
        return land.nodes.land.geometry.toNonIndexed();
    }, [land.nodes.land.geometry]);


    // need to find better way to update grass blade rotation
    // this works but breaks every other transformation we apply on grass like scaling
    // useFrame(() => {
    //     if (!instancedMeshRef.current) return;

    //     const instancedMesh = instancedMeshRef.current;
    //     const dummy = new THREE.Object3D(); // Temporary object for updating matrix

    //     for (let i = 0; i < count; i++) {
    //         instancedMesh.getMatrixAt(i, dummy.matrix); // Get the current instance matrix
    //         dummy.position.setFromMatrixPosition(dummy.matrix); // Extract position

    //         // Calculate Y-axis rotation to face the camera
    //         const direction = new THREE.Vector3();
    //         direction.subVectors(camera.position, dummy.position).normalize();
    //         const angleY = Math.atan2(direction.x, direction.z);
    //         dummy.rotation.set(0, angleY, 0); // Set rotation only on Y-axis

    //         dummy.updateMatrix();
    //         instancedMesh.setMatrixAt(i, dummy.matrix); // Update the instance matrix
    //     }

    //     instancedMesh.instanceMatrix.needsUpdate = true; // Notify Three.js of matrix updates
    // });

    return (
        <group position={[0, -5, 0]}>
            <mesh
                ref={landRef}
                receiveShadow
                castShadow
                geometry={landGeometry} // Use non-indexed geometry
            >
                <meshBasicMaterial color="green" side={THREE.DoubleSide} />
            </mesh>
            <Sampler
                // weight="density"
                count={count}
                transform={({ position, normal, dummy: object }) => {
                    const p = position.clone().multiplyScalar(5);
                    const n = perlin.simplex3(...p.toArray());
                    object.scale.setScalar(THREE.MathUtils.mapLinear(n, -1, 1, 0.7, 1) );
                    object.position.copy(position);
                    object.rotation.y += Math.random() - 0.5 * (Math.PI * 0.5);
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
                    <CustomShaderMaterial
                        baseMaterial={THREE.MeshBasicMaterial}
                        fragmentShader={grassBladeFragmentShader}
                        vertexShader={grassBladeVertexShader}
                        side={THREE.DoubleSide}
                    />
                </instancedMesh>
            </Sampler>
        </group>
    );
};

export default GrassBlades;
