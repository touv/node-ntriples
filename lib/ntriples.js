'use strict';

// Références :
// http://www.w3.org/2001/sw/RDFCore/ntriples/
// http://www.w3.org/2000/10/rdf-tests/rdfcore/ntriples/test.nt
//
//
var unidecode = require('unidecode');
var ws = ' ', eoln = '\n';

exports.echap = function (str) {
  return encodeURI(unidecode(str).replace(/[^a-z0-9\-_]+/gi, '-').replace(/^-+|-+$|(-)-+/g, '-').toLowerCase());
}
exports.stringify = function (subject, predicate, object) {

  if (!object || typeof object != 'string') {
    return;
  }
  var output = subject + ws + '<' + exports.echap(predicate) + '>' + ws;
  if (object.substring(0, 1) === '<') {
    output += object;
  }
  else if (object.substring(0, 2) === '_:') {
    output += object;
  }
  else {
    output += '"' + object.replace(/[\\"'\n\r\t]/g, '\\$&')
    .replace(/\u0000/g, '\\0') + '"';
  }
  output += ws;
  return  output + '.' + eoln;
}

exports.parse = function (input) {
};

