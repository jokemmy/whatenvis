
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';


const env = process.env.NODE_ENV;

const config = {
  input: 'src/index.js',
  output: {
    name: 'whatenvis',
    format: 'umd',
    file: './dist/whatenvis.js'
  },
  plugins: [
    nodeResolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify( env )
    })
  ]
};

if ( env === 'production' ) {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true/* ,
        warnings: false */
      }
    })
  );
}

export default config;
