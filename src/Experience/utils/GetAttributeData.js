import * as THREE from 'three';

// import getYPosition from './GetYPosition.js';
import multiplyQuaternions from './MultiplyQuarternion.js';

const getAttributeData = (instances, width) => {
    const offesets = []; // 3 values (x, y, z) per instances of grass balde
    const orientations = []; // 4 values per quartanion for each grass blade
    const streches = []; // 1 value for each grass blade
    const halfRootAngleSin = [];
    const halfRootAngleCos = [];

    let quarternion_0 = new THREE.Vector4();
    let quarternion_1 = new THREE.Vector4();

    const min = -0.25;
    const max = 0.25;

    for (let i = 0; i < instances; i++) {
        //offset of each grass blade
        const offsetX = Math.random() * width - width / 2;
        const offsetZ = Math.random() * width - width / 2;
        // const offsetY = getYPosition(offsetX, offsetZ);
        const offsetY = 0;
        offesets.push(offsetX, offsetY, offsetZ);

        // Define random growth directions
        // Rotation around Y

        let angle = Math.PI - Math.random() * (2 * Math.PI);
        halfRootAngleSin.push(Math.sin(0.5 * angle));
        halfRootAngleCos.push(Math.sin(0.5 * angle));

        let RotationAxis = new THREE.Vector3(0, 1, 0);
        let x = RotationAxis.x;
        let y = RotationAxis.y * Math.sin(angle / 2.0);
        let z = RotationAxis.z;
        let w = Math.cos(angle / 2);
        quarternion_0.set(x, y, z, w).normalize();

        // Rotation around x
        angle = Math.random() * (max - min) + min;
        RotationAxis = new THREE.Vector3(1, 0, 0);
        x = RotationAxis.x * Math.sin(angle / 2.0);
        y = RotationAxis.y;
        z = RotationAxis.z;
        w = Math.cos(angle / 2);
        quarternion_1.set(x, y, z, w).normalize();

        // combine rotation to a single quarternion
        quarternion_0 = multiplyQuaternions(quarternion_0, quarternion_1);

        // rotate around z
        angle = Math.random() * (max - min) + min;
        RotationAxis = new THREE.Vector3(0, 0, 1);
        x = RotationAxis.x;
        y = RotationAxis.y;
        z = RotationAxis.z * Math.sin(angle / 2.0);
        w = Math.cos(angle / 2);
        quarternion_1.set(x, y, z, w).normalize();

        // combine rotation to a single quarternion
        quarternion_0 = multiplyQuaternions(quarternion_0, quarternion_1);

        orientations.push(
            quarternion_0.x,
            quarternion_0.y,
            quarternion_0.z,
            quarternion_0.w
        );

        //variation in height
        if (i < instances / 3) {
            streches.push(Math.random() * 0.5 + 0.5);
        } else {
            streches.push(Math.random() * 0.5 + 0.25);
        }
    }

    return {
        offesets,
        orientations,
        streches,
        halfRootAngleSin,
        halfRootAngleCos
    };
};

export default getAttributeData;
