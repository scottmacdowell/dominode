/* global malarkey:false, toastr:false, moment:false */
(function() {
  'use strict';

  angular
    .module('dominode')
    .constant('sampleHtml', '<!doctype html>\n<html lang="en">\n\t<head>' +
    '\n\t\t<meta charset="utf-8">\n\t\t<title>DOM Tree as a File System</title>' +
    '\n\t</head>\n\n\t<body>' +
    '\n\t\t<h1>An Example Site</h1>\n\t\t<h3>To Demonstrate what some nested nodes might look like</h3>\n\t\t<ul>' +
    '\n\t\t\t<li>One</li>\n\t\t\t<li>Two</li>\n\t\t\t<li>Three</li>\n\t\t</ul>\n\t\t<p>\n\t\t\tSome Text ' +
    '\n\t\t\t<!-- A Comment --> \n\t\t\tMore Text \n\t\t</p>' +
    '\n\t</body>\t\n</html>');

})();
