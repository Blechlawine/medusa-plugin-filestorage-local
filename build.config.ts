import { defineBuildConfig } from "unbuild";

// for config options, see https://github.com/unjs/unbuild/blob/HEAD/src/types.ts
export default defineBuildConfig({
    entries: [
        // inputs to build
        {
            builder: "mkdist",
            input: "./src/api/",
            outDir: "./api",
            ext: "js",
        },
        {
            builder: "mkdist",
            input: "./src/services/",
            outDir: "./services",
            ext: "js",
        },
    ],
    outDir: ".",
    declaration: true, // generates .d.ts files
});
