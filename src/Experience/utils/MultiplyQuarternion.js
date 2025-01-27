import * as THREE from 'three';

const multiplyQuaternions = (q1, q2) => {
    const x = q1.x * q2.w + q1.y * q2.z - q1.z * q2.y + q1.w * q2.x;
    const y = -q1.x * q2.z + q1.y * q2.w + q1.z * q2.x + q1.w * q2.y;
    const z = q1.x * q2.y - q1.y * q2.x + q1.z * q2.w + q1.w * q2.z;
    const w = -q1.x * q2.x - q1.y * q2.y - q1.z * q2.z + q1.w * q2.w;
    return new THREE.Vector4(x, y, z, w);
};

export default multiplyQuaternions;
