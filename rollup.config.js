import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import buble from 'rollup-plugin-buble';

const pkg = require('./package.json');

export default {
  input: 'src/Modal.svelte',
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' },
  ],
  plugins: [
    buble()
  ],
};
