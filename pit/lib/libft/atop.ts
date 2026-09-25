export default function atop(input: boolean[]): number {
  let output = 0.0;
  for (let i = 0; i < input.length; i++) if (input[i] == true) output++;
  console.log(output, output / input.length);
  return output / input.length;
}
