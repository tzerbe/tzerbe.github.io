var getEdges = require('../grapher/tags.js').getEdges;
var assert = require('assert');

var tags = {
  tagName: [
    1,2,4
  ],
  tagNameTwo: [
    4,5,2,1
  ]
};

assert.equal(getEdges(tags).length, 6);