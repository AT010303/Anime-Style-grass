// precision highp float;
attribute vec3 offset;
attribute vec4 orientation;
attribute float halfRootAngleSin;
attribute float halfRootAngleCos;
attribute float stretch;

uniform float uTime;

varying vec2 vUv;

#include ../includes/simplexNoise3d.glsl
#include ../includes/perlin3d.glsl
#include ../includes/simplexNoise2d.glsl

vec4 slerp(vec4 v0, vec4 v1, float t) {
        // Only unit quaternions are valid rotations.
        // Normalize to avoid undefined behavior.
        normalize(v0);
        normalize(v1);
      
        // Compute the cosine of the angle between the two vectors.
        float dot_ = dot(v0, v1);
      
        // If the dot product is negative, slerp won't take
        // the shorter path. Note that v1 and -v1 are equivalent when
        // the negation is applied to all four components. Fix by 
        // reversing one quaternion.
        if (dot_ < 0.0) {
          v1 = -v1;
          dot_ = -dot_;
        }  
      
        const float DOT_THRESHOLD = 0.9995;
        if (dot_ > DOT_THRESHOLD) {
          // If the inputs are too close for comfort, linearly interpolate
          // and normalize the result.
          vec4 result = t*(v1 - v0) + v0;
          normalize(result);
          return result;
        }
      
        // Since dot is in range [0, DOT_THRESHOLD], acos is safe
        float theta_0 = acos(dot_);       // theta_0 = angle between input vectors
        float theta = theta_0*t;          // theta = angle between v0 and result
        float sin_theta = sin(theta);     // compute this value only once
        float sin_theta_0 = sin(theta_0); // compute this value only once
        float s0 = cos(theta) - dot_ * sin_theta / sin_theta_0;  // == sin(theta_0 - theta) / sin(theta_0)
        float s1 = sin_theta / sin_theta_0;
        return (s0 * v0) + (s1 * v1);
      }

      vec3 rotateVectorByQuaternion( vec3 v, vec4 q){
        return 2.0 * cross(q.xyz, v * q.w + cross(q.xyz, v)) + v;
      }

void main() {

    float frc = position.y/float(6.0);

    float noise = 1.0 - (simplexNoise2d(vec2((uTime * 0.25 - offset.x/100.0), (uTime * 0.25 - offset.z/100.0))));

    vec4 direction = vec4(0.0, halfRootAngleSin, 0.0, halfRootAngleCos);

    direction = slerp(direction, orientation, frc);

    vec3 vPosition = vec3(position.x, position.y + position.y * stretch, position.z);
    vPosition = rotateVectorByQuaternion(vPosition, direction);

    float halfAngle = noise * 0.15;

    vPosition = rotateVectorByQuaternion(vPosition, normalize(vec4(sin(halfAngle), 0.0, -sin(halfAngle), cos(halfAngle))));

    csm_Position = (offset  + vPosition * 1.5) ;

    vUv = uv;
}
