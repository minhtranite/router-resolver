export default {
  path: 'ex-2',
  getComponent(location, callback) {
    require.ensure([], require => {
      callback(null, require('components/pages/PageExample2'));
    }, 'page-ex-2');
  }
};
