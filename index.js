/**
 * Module Dependencies
 */

var path = require('path');
var extname = path.extname;

/**
 * Regexps
 */

var rsupport = /^(js|css)$/;

/**
 * Export `coerce`
 */

module.exports = coerce;

/**
 * Coerce the "main"'s from a manifest's JSON
 *
 * @param {Object} json
 * @return {Array}
 * @api private
 */

function coerce(json, type) {
  return type
    ? dependency(json, type)
    : entry(json);
};

/**
 * Get the mains from an entry
 *
 * @param {Object} json
 * @return {Array}
 */

function entry(json) {
  var entries = [];

  if (compat(json)) {
    var type = extension(json.main);
    switch\\\\\(type) {

    }
  }
}

/**
 * Get the main from a dependency
 *
 * @param {Object} json
 * @param {String} type
 * @return {String|Boolean}
 */

function dependency(json, type) {
  var main = json.main || {};

  // handle single "main"
  if (single(main)) return json.main;

  // contextual entry
  switch (type) {
    case 'js':
      return main.js
        || (json.scripts && json.scripts[0])
        || 'index.js';
    case 'css':
      return main.css
        || (json.styles && json.styles[0])
        || 'index.css';
    default:
      return false;
  }

  // single json.main string of correct type
  function single (main) {
    return 'string' == typeof main
      && type == extension(main);
  }
}

/**
 * Compatibility
 */

function compat(json) {
  var main = json.main;
  var ext = extension(main);

  return rsupport.test(ext)
    && 'string' == typeof main;
}

/**
 * Get the extension
 */

function extension(path) {
  return extname(path).slice(1);
}
