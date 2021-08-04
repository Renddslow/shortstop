const mri = require('mri');

const prog = mri(process.argv.slice(2), {
  boolean: ['watch', 'minify'],
});

require('esbuild').build({
  entryPoints: ['src/index.tsx'],
  bundle: true,
  platform: 'browser',
  outfile: 'public/main.js',
  minify: prog.minify,
  jsxFactory: 'h',
  jsxFragment: 'Fragment',
  watch: prog.watch,
});
