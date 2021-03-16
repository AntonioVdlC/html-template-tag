import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.cjs.js",
      format: "cjs",
      exports: "default",
    },
    external: ["html-es6cape"],
    plugins: [typescript(), terser()],
  },
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.esm.js",
      format: "es",
    },
    external: ["html-es6cape"],
    plugins: [typescript(), terser()],
  },
];
