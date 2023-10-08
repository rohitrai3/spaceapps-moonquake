export const getVertexShader = () => {
  return `
uniform float amplitude;
uniform float index;

varying float x;
varying float y;
varying float z;

void main() {
  float distance = round(sqrt(pow(position.x, 2.0) + pow(position.y, 2.0)));
  if (distance == index) {
    z = abs(sin(amplitude)) * 10.0;
  }
  if (distance + 1.0 == index + 1.0) {
    z = abs(sin(amplitude)) * 10.0;
  }
  if (distance + 2.0 == index + 2.0) {
    z = abs(sin(amplitude)) * 10.0;
  }
  if (distance + 3.0 == index + 3.0) {
    z = abs(sin(amplitude)) * 10.0;
  }
  if (distance + 4.0 == index + 4.0) {
    z = abs(sin(amplitude)) * 10.0;
  }
  if (distance + 5.0 == index + 5.0) {
    z = abs(sin(amplitude)) * 10.0;
  }

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, position.z + z, 1.0);
}`;
};
