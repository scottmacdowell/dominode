(function() {
  'use strict';

  angular
    .module('domtree')
    .factory('recursionHelper', recursionHelperFn);

  /** @ngInject */
  function recursionHelperFn($compile, $rootScope) {
    return {
      compile: function(element, link){
        // Normalize the link parameter
        if(angular.isFunction(link)){
          link = { post: link };
        }

        // Break the recursion loop by removing the contents
        var contents = element.contents().remove();
        var compiledContents;
        return {
          pre: (link && link.pre) ? link.pre : null,
          post: function(scope, element){
            scope.open            = false;
            scope.isSelected      = false;
            scope.setFileMargin   = setFileMargin;
            scope.setFolderMargin = setFolderMargin;
            scope.toggleFolder    = toggleFolder;

            scope.$on('parentClosed', function(){
              scope.open = false;
            });

            scope.$on('deselectAll', function(){
              scope.isSelected = false;
            });

            function setFolderMargin(nodeType, depth) {
              var margin = (nodeType) ? 24 * depth : 0;
              return { 'margin-left': margin + 'px' };
            }

            function setFileMargin(nodeType, depth) {
              var margin = (nodeType) ? 0 : (24 * depth) + 44;
              return { 'margin-left': margin + 'px' };
            }

            function toggleFolder(node){
              scope.selectedNode = node.type || node.text;
              scope.open = !scope.open;
              scope.$emit('nodeSelected', scope.selectedNode);
              $rootScope.$broadcast('deselectAll');
              if(scope.open === false) {
                scope.$broadcast('parentClosed');
              }
              scope.isSelected = !scope.isSelected;
            }

            // Compile the contents
            if(!compiledContents){
              compiledContents = $compile(contents);
            }
            // Re-add the compiled contents to the element
            compiledContents(scope, function(clone){
              element.append(clone);
            });

            // Call the post-linking function, if any
            if(link && link.post){
              link.post.apply(null, arguments);
            }
          }
        };
      }
    };
  }
})();
