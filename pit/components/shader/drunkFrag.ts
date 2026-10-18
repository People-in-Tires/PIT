export default `
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

#define DRUNK_CAP 100.0
uniform float u_drunk;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float intensity = u_drunk / DRUNK_CAP;

  vec2 wobble = vec2(
    sin(uv.y * 20.0 + u_time * 2.0) * 0.02,
    cos(uv.x * 20.0 + u_time * 1.5) * 0.02
  ) * intensity;

  vec2 distortedUv = uv + wobble;

  vec3 base = vec3(0.1, 0.15, 0.25);
  vec3 drunkColor = vec3(0.6, 0.2, 0.1);
  vec3 col = mix(base, drunkColor, intensity);

  float dist = distance(distortedUv, vec2(0.5));
  float vignette = smoothstep(0.8, 0.2, dist * (1.0 + intensity * 0.5));

  gl_FragColor = vec4(col * vignette, 1.0);
}
`;
