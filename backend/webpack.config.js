import path from "node:path";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import nodeExternals from "webpack-node-externals";
export default function (env) {
  const mode = env.production || process.env.NODE_ENV === "production"? "production": "development"
  return ({
    target: "node",
    externals: [nodeExternals({
      importType: "module"
    })],
    mode: mode,
    entry: './src/index.ts',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },


    resolve: {
      extensions: ['.ts', '.js'],
      plugins: [new TsconfigPathsPlugin()]
    },
    output: {
      filename: 'app.js',
      path: path.join(process.cwd(), 'dist'),
      libraryTarget: 'module',
      chunkFormat: "module",
      environment: {
        // The environment supports arrow functions ('() => { ... }').
        arrowFunction: true,
        // The environment supports BigInt as literal (123n).
        bigIntLiteral: true,
        // The environment supports const and let for variable declarations.
        const: true,
        // The environment supports destructuring ('{ a, b } = obj').
        destructuring: true,
        // The environment supports an async import() function to import EcmaScript modules.
        dynamicImport: true,
        // The environment supports 'for of' iteration ('for (const x of array) { ... }').
        forOf: true,
        // The environment supports ECMAScript Module syntax to import ECMAScript modules (import ... from '...').
        module: true,
        // The environment supports optional chaining ('obj?.a' or 'obj?.()').
        optionalChaining: true,
        // The environment supports template literals.
        templateLiteral: true,
      },
    },
    experiments: {
      outputModule: true
    }
  })
};