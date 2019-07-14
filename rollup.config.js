import autoExternal from 'rollup-plugin-auto-external';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';

export default [
  {
    input: 'src/pushfile.js',
    output: {
      file: 'lib/pushfile.min.js',
      format: 'cjs',
    },
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**',
      }),
      json(),
      commonjs(),
      autoExternal(),
      terser(),
    ],
  },
];
