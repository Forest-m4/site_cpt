module.exports = {
  blogApi: {
    input: {
      target: "http://localhost:3000/docs-json",
    },
    output: {
      target: "./src/api/generated.ts",
      client: "axios",
    },
  },
};
