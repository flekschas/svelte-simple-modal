import resolve from '@rollup/plugin-node-resolve';
import filesize from 'rollup-plugin-filesize';
import svelte from 'rollup-plugin-svelte';

import { main, module } from './package.json';

export default {
  input: 'src/Modal.svelte',
  output: [
    {
       file: main,
       format: 'cjs',
       exports: 'auto'
    },
    {
      file: module,
      format: 'es',
      exports: 'auto'
    },
  ],
  plugins: [
    svelte(),
    resolve(),
    filesize(),
  ],
  external: ['svelte']
};
