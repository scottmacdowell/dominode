(function() {
  'use strict';

  angular
    .module('domtree', [])
    .directive('domtree', domtreeFn);

    function domtreeFn(recursionHelper) {
      var directive = {
        restrict: 'E',
        replace: false,
        templateUrl: 'app/components/domtree/domtree.template.html',
        scope: {
          node: '=',
          isParentActive:'=',
          selectedNode: '='
        },
        compile: compile
      };

      return directive;

      function compile(element){
        //Link function is in recursion helper
        return recursionHelper.compile(element);
      }
    }
})();
