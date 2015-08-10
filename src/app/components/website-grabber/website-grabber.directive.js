(function() {
  'use strict';

  angular
    .module('websiteGrabber', [])
    .directive('websiteGrabber', websiteGrabberFn);

    function websiteGrabberFn() {
      var directive = {
        restrict: 'E',
        replace: true,
        templateUrl: 'app/components/website-grabber/website-grabber.template.html',
        scope: {
          parse: '&',
          modal: '=',
          sampleHtml:'='
        },
        link: link
      };

      return directive;

      function link(scope) {
        scope.activateModal = activateModal;
        scope.html = {
          toExplore: scope.sampleHtml
        };

        function activateModal(html){
          if(html === undefined){
            html = {
              toExplore: null
            };
          }
          scope.parse({html: html.toExplore})
            .then(function(){
              scope.modal = true;
            });
        }
      }
    }
})();
