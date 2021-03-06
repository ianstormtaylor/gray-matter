/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter.git>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('should');
var fs = require('fs');
var _ = require('lodash');
var matter = require('..');
var pkg = require('../package');

describe('.stringify()', function () {

  it('should extract front matter, extend it, and convert it back to front matter.', function () {
    var res = matter.stringify('Name: {{author.name}}', pkg.author);
    res.should.equal([
      '---',
      'name: Jon Schlinkert',
      'url: "https://github.com/jonschlinkert"',
      '---',
      'Name: {{author.name}}\n'
    ].join('\n'));
  });

  it('should use custom delimiters.', function () {
    var res = matter.stringify('Name: {{author.name}}', pkg.author, {delims: '~~~'});
    res.should.equal([
      '~~~',
      'name: Jon Schlinkert',
      'url: "https://github.com/jonschlinkert"',
      '~~~',
      'Name: {{author.name}}\n'
    ].join('\n'));
  });
});