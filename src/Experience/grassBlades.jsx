/* eslint-disable no-unused-vars */
import { Sampler, useGLTF } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
import { createNoise3D } from 'simplex-noise';
import * as THREE from 'three';

const GrassBlades = () => {
    const grassBlades = useGLTF('/grassBlade2.glb'); // Load grass blades model
    const land = useGLTF('/land.glb');
    const instancedMeshRef = useRef();
    const landRef = useRef();

    const noise  = useMemo(() => createNoise3D(Math.random), []);
    const count = 1000; // Number of grass blades

    console.log(land);
    
    

    return (
        <group>
            <mesh
                ref={landRef}
                receiveShadow
                castShadow
                geometry={land.nodes.land.geometry}
                // scale={[land.nodes.land.scale.x, land.nodes.land.scale.y, land.nodes.land.scale.z]}
            >
                <meshStandardMaterial color="green"  side={THREE.DoubleSide}/>
            </mesh>
            <>
                <Sampler
                    count={count}
                    transform={({ position, normal, dummy: object}) => {
                        const p = position.clone().multiplyScalar(2);
                        let n = noise(...p.toArray());
                        n = THREE.MathUtils.smootherstep(n, 0.0, 0.7);
                        object.scale.setScalar(
                            THREE.MathUtils.mapLinear(n, -1, 1, 0.5, 1.5)
                        );
                        object.position.copy(position);
                        // object.rotation.y = THREE.MathUtils.randFloatSpread(2 * Math.PI);
                        object.scale.x = 4;
                        object.updateMatrix();
                        return object;
                    }}
                    mesh = {landRef}
                >
                    
                    <instancedMesh
                        // ref={instancedMeshRef}
                        receiveShadow
                        args={[grassBlades.nodes.grassBlade.geometry, null, count]}

                    >
                        <meshStandardMaterial color="lightgreen"  side={THREE.DoubleSide}/>
                    </instancedMesh>
                </Sampler>
            </>
        </group>  
    );
};

export default GrassBlades;
