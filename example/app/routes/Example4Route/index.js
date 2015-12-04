export default {
  path: 'ex-4',
  getComponent(location, callback) {
    require.ensure([], require => {
      callback(null, require('components/pages/PageExample4'));
    }, 'page-ex-4');
  },
  getChildRoutes(location, callback) {
    require.ensure([], () => {
      callback(null, [
        require('./Modal')
      ]);
    }, 'page-ex-4');
  }
};
