export const getFragmentShader = () => {
  return `
uniform float amplitude;

varying float x;
varying float y;
varying float z;

void main() {
  gl_FragColor = vec4(sin(abs(amplitude)), cos(abs(amplitude)), sin(abs(amplitude)), 1.0);
}
`;
};
