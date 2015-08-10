(function() {
  'use strict';

  angular
    .module('dominode')
    .controller('Controller', ControllerFn);

  /** @ngInject */
  function ControllerFn(domParser, sampleHtml) {
    var vm = this;

    vm.sampleHtml     = sampleHtml;
    vm.isModalActive  = false;
    vm.getSampleFile  = domParser.parseHTMLtoObject;
    vm.nodeList       = domParser.getHtmlObject;
  }
})();
