export default {
  path: 'ex-3',
  getComponent(location, callback) {
    require.ensure([], require => {
      callback(null, require('components/pages/PageExample3'));
    }, 'page-ex-3');
  }
};
