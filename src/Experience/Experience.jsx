import { CameraControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';

import GrassBlades from './grassBlades.jsx';
import Land from './Land.jsx';

const Experience = () => {
    return (
        <>
            <Canvas camera={{ position: [0, 15, 65], fov: 50 }}>
                <Perf position={'top-left'} />
                <CameraControls 
                    // maxAzimuthAngle={Math.PI }
                    // maxPolarAngle={Math.PI / 2}
                    // minAzimuthAngle={-Math.PI}
                    // minPolarAngle={Math.PI / 2.3}
                    // truck={false}
                    // maxDistance={100}
                    // minDistance={60}

                />
                <GrassBlades />
                <Land />
            </Canvas>
        </>
    );
};

export default Experience;
