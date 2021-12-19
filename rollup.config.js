/* eslint-env node */
import svelte from 'rollup-plugin-svelte';
import sveld from 'sveld';

import pkg from './package.json';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: pkg.svelte,
  output: { format: 'es', file: pkg.module },
  plugins: [
    svelte({
      emitCss: false,
    }),
    production && sveld(),
  ],
  external: ['svelte', 'svelte/internal', 'svelte/transition'],
};
