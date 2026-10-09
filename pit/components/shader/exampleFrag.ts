export default `
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;

  vec3 color = vec3(st.x, st.y, .5); 
  gl_FragColor = vec4(color, 1.0);
}
`;
