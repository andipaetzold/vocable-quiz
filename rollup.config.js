import typescript from "rollup-plugin-typescript2";
import copy from "rollup-plugin-copy";
import pkg from "./package.json";
import path from "path";

export default {
    input: "src/functions/index.ts",
    output: [
        {
            file: "./build-functions/index.js",
            format: "cjs",
        },
    ],
    external: [...Object.keys(pkg.dependencies)],
    plugins: [
        typescript({
            typescript: require("typescript"),
            tsconfig: path.resolve(__dirname, "./tsconfig.functions.json"),
        }),
        copy({
            targets: [{ src: "src/functions/package.json", dest: "build-functions" }],
        }),
    ],
};
