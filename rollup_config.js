const resolve = require('@rollup/plugin-node-resolve'); // locate and bundle dependencies in node_modules (mandatory)
const { terser } = require("rollup-plugin-terser"); // code minification (optional)
const commonjs = require('@rollup/plugin-commonjs');

module.exports = {
	input: 'src/main.js',
	output: [
		{
			format: 'umd',
			name: 'EEGVisualizer',
			file: 'build/bundle.js'
		}
	],
	plugins: [ resolve(), commonjs() ]
};
