import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';
import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [
    { file: pkg.browser, format: 'umd', name: 'Rhenium' },
    { file: pkg.module, format: 'es' }
  ],
  plugins: [
    babel({
      exclude: ['node_modules/**']
    }),
    minify({
      mangle: false
    })
  ]
};
