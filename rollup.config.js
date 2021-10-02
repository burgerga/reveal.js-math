export default {
  input: 'src/main.js',
  output: [
    {
      file: 'dist/math.esm.js',
      format: 'es'
    },
    {
      file: 'dist/math.umd.js',
      format: 'umd',
      name: 'RevealMath',

    }
  ]
};
