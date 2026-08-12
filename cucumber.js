module.exports = {
  default: {
    paths: ["src/test/features/**/*.feature"],
    require: [
      "src/hooks/hooks.ts",
      "src/test/steps/*.ts"
    ],
    requireModule: [
      "ts-node/register"
    ]
  }
};