(function() {
  'use strict';

  angular
    .module('dominodeModal', ['domtree'])
    .directive('dominodeModal', dominodeModalFn);

    function dominodeModalFn() {
      var directive = {
        restrict: 'E',
        replace: true,
        templateUrl: 'app/components/dominode-modal/dominode-modal.template.html',
        scope: {
          nodeList: '=',
          modal:    '='
        },
        link: link
      };

      return directive;

      function link(scope) {
        scope.closeModal = closeModal;
        scope.getTitle = getTitle;
        scope.selectedNode = false;

        function closeModal() {
          scope.modal = false;
        }

        function getTitle(head) {
          head = head || null;

          head.folders.forEach(function(data){
            if(  data.type          === 'title'
              && data.files[0]      !== undefined
              && data.files[0].text !== undefined
            ){

              head.title = data.files[0].text;
            }
          });

          return (head.title) ? head.title : 'Untitled';
        }

        scope.$on('nodeSelected', function(event, node){
          scope.selectedNode = node;
        });
      }
    }
})();
