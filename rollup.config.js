
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';

const env = process.env.NODE_ENV;
const config = {
  name: 'whatenvis',
  input: 'src/index.js',
  plugins: [
    nodeResolve({
      jsnext: true
    }),
    babel({
      plugins: [
        'external-helpers'
      ],
      exclude: 'node_modules/**'
    }),
    commonjs({
      include: 'node_modules/**'
    }),
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
        unsafe_comps: true,
        warnings: false
      }
    })
  );
}

export default config;
