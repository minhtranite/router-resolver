export default {
  path: 'modal',
  getComponent(location, callback) {
    require.ensure([], require => {
      callback(null, require('components/pages/PageExample4/Modal'));
    }, 'page-ex-4-modal');
  }
};
