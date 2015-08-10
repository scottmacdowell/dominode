(function() {
  'use strict';

  angular
    .module('dominode')
    .factory('domParser', domParserFn);

  /** @ngInject */
  function domParserFn($q) {
 //Model
    var model = {};

//Factory API
    var domParserApi = {
      getHtmlObject: getHtmlObject,
      parseHTMLtoObject: parseHTMLtoObject
    };

    return domParserApi;

//Public Functions
    function getHtmlObject() {
      return model;
    }

    function parseHTMLtoObject(loadedHtml) {
      var dom = parseHTMLtoDOM(loadedHtml);
      var htmlObject = {
        body: {},
        head: {}
      };
      return $q(function(resolve){
        clean(dom);
        parseDOMtoObject(dom['body'], htmlObject.body, -1);
        parseDOMtoObject(dom['head'], htmlObject.head, -1);
        model = htmlObject;
        resolve(htmlObject);
      });
    }

//Private Functions
    function parseHTMLtoDOM(html) {
      return (typeof html === 'string' && window.DOMParser)
        ? new DOMParser().parseFromString(html,'text/html')
        : null;
    }

    function parseDOMtoObject(node, object, depth) {
      var child;
      depth = depth + 1;
      object['type']    = node.nodeName.toLowerCase();
      object['folders'] = [];
      object['files']   = [];
      object['depth'] = depth;

      for (var i = 0; i < node.childNodes.length; i++) {
        child = node.childNodes[i];

        if (child.nodeType === 3) {
          object['files'].push({text: child.nodeValue, depth: depth });

        } else {
          object['folders'].push({});
          object['folders'].depth = depth;
          parseDOMtoObject(child, object['folders'][object['folders'].length -1], depth);
        }
      }
    }

    function clean(node) {
      var child;
      for (var i = 0; i < node.childNodes.length; i++) {
        child = node.childNodes[i];

        if (child.nodeType === 8
            || (child.nodeType === 3 && !/\S/.test(child.nodeValue))
        ){
          node.removeChild(child);
          i--;

        }
        else if (child.nodeType === 1) {
          clean(child);
        }
      }
    }
  }
})();
