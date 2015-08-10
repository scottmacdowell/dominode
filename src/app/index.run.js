(function() {
  'use strict';

  angular
    .module('dominode')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {
    $log.debug('App has started running...');
  }

})();
