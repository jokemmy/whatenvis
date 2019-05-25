
import serve from 'rollup-plugin-serve';
import config from '../rollup.config';

config.plugins.push( serve({
  port: 3000,
  contentBase: [ 'examples', 'dist' ]
}));

export default config;
