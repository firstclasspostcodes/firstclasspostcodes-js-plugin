module.exports = {
  transform: {
    '\\.js$': 'babel-jest',
    '\\.svelte$': 'svelte-jester',
  },
  setupFilesAfterEnv: [
    './jest.setup.js',
  ],
  moduleFileExtensions: [
    'js',
    'json',
    'svelte',
  ],
};
