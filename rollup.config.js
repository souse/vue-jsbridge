import path from 'path';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: {
    file: path.resolve(__dirname, './lib', 'index.js'),
    format: 'umd',
    name: 'VueJsBridge'
  },
  plugins: [
  	terser()	
  ]
};