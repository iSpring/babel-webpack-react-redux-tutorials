const asyncLoader = () => {
  return new Promise(resolve => {
    require.ensure([], () => {
      const component = require('./index.js').default;
      resolve(component);
    });
  });
};

window.asyncLoader = asyncLoader;

export default asyncLoader;