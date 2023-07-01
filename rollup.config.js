/* eslint-env node */
import node from '@rollup/plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
import { sveld } from 'sveld';

import { readFileSync } from 'fs';
const pkg = JSON.parse(readFileSync('./package.json'));

const production = !process.env.ROLLUP_WATCH;

export default {
  input: pkg.svelte,
  output: { format: 'es', file: pkg.module },
  plugins: [
    svelte({ emitCss: false }),
    node({
      browser: true,
      exportConditions: ['svelte'],
      extensions: ['.svelte'],
    }),
    production && sveld(),
  ],
  external: ['svelte', 'svelte/internal', 'svelte/transition'],
};
