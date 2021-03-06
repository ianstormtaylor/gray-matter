# gray-matter [![NPM version](https://badge.fury.io/js/gray-matter.svg)](http://badge.fury.io/js/gray-matter)  [![Build Status](https://travis-ci.org/.svg)](https://travis-ci.org/) 

> Parse front-matter from a string or file. Fast, reliable and easy to use. Parses YAML front matter by default, but also has support for YAML, JSON, TOML or Coffee Front-Matter, with options to set custom delimiters.

See the [benchmarks](#benchmarks). gray-matter is 15-30x faster than [front-matter]().

## Highlights

* Reliable and battle-tested with [assemble](https://github.com/assemble/assemble), [verb](https://github.com/assemble/verb), and many other projects!
* Will extract and parse:
  * [YAML](http://github.com/nodeca/js-yaml)
  * [JSON](http://en.wikipedia.org/wiki/Json)
  * [TOML](http://github.com/mojombo/toml)
  * [CoffeeScript](http://coffeescript.org) when `options.eval` is set to `true`
  * [CSON](https://github.com/bevry/cson) when `options.eval` is set to `true`
  * JavaScript: when `options.eval` is set to `true`
* Easy to add additional parsers! pull requests welcome!


## Install with [npm](npmjs.org)

```bash
npm i gray-matter --save
```
### Install with [bower](https://github.com/bower/bower)

```bash
bower install gray-matter --save
```


## Usage

```js
var matter = require('gray-matter');
matter('---\ntitle: Front Matter\n---\nThis is content.');
```

Returns:

```js
{ 
  orig: '---\ntitle: Front Matter\n---\nThis is content.',
  data: { title: 'Front Matter' },
  content: '\nThis is content.' 
}
```

That's it! Just pass a string and gray-matter returns an object.


***


## API
### [matter](./index.js#L30)

Parses a `string` of front-matter with the given `options`, and returns an object.

* `string` **{String}**: The string to parse.    
* `options` **{Object}**  
    - `delims` **{Array}**: Custom delimiters formatted as an array. The default is `['---', '---']`.
    - `parser` **{Function}**: Parser function to use. [js-yaml] is the default.
      
* `returns` **{Object}**: Valid JSON  

```js
matter('---\ntitle: foo\n---\nbar');
//=> {data: {title: 'foo'}, content: 'bar', orig: '---\ntitle: foo\n---\nbar'}
```

### [.read](./index.js#L127)

Read a file and parse front matter. Returns the same object as `matter()`.

* `fp` **{String}**: file path of the file to read.    
* `options` **{Object}**: Options to pass to gray-matter.    
* `returns`: {Object}  

```js
matter.read('home.md');
```

### [.stringify](./index.js#L158)

Stringify an object to front-matter-formatted YAML, and concatenate it to the given string.

* `str` **{String}**: The content string to append to stringified front-matter.    
* `data` **{Object}**: Front matter to stringify.    
* `options` **{Object}**: Options to pass to js-yaml    
* `returns`: {String}  

```js
matter.stringify('foo bar baz', {title: 'Home'});
```

Results in:

```yaml
---
title: Home
---
foo bar baz
```



## Options

> All methods exposed on the API accept an options object passed as the last argument

## options.parser
Type: `Function`

Default: `undefined`

Pass a custom parser on the options. This is useful if you need to, for example, define custom schemas for [js-yaml].

**Example**

```js
matter(str, {
  parser: require('js-yaml').safeLoad
});
```

## options.eval
Type: `Boolean`

Default: `false`

Evaluate coffee-script, CSON or JavaScript in front-matter. If you aren't aware of the dangers, google is your friend. 

However, if you are aware and you only use front-matter on, say, blog posts for a static site... this feature can be pretty useful.


## options.lang
Type: `String`

Default: `yaml`

The parser to use on the extracted front matter. 

YAML is parsed by default, and the languages listed below are parsed automatically if the language is specified after the first delimiter (e.g. `---`). 

Valid languages are:

* `yaml`
* `json`
* `coffee` 
* `cson` 
* `toml` 
* `js`|`javascript`

**Example**

To parse coffee front matter, you would define it as follows:

```js
---coffee
title: 'coffee functions'
user: 'jonschlinkert'
fn:
  reverse = (src) ->
    src.split('').reverse().join('')
---

<%= description %>
<%= reverse(user) %>
```

## options.delims
Type: `String`

Default: `---`

Open and close delimiters can be passed in as an array of strings. 

**Example:**

```js
// format delims as a string
matter.read('file.md', {delims: '~~~'});
// or an array (open/close)
matter.read('file.md', {delims: ['~~~', '~~~']});
```

would parse:

<pre>
~~~
title: Home
~~~
This is the {{title}} page.
</pre>


## Example usage

Given we have a page, `abc.html`, containing:

```html
---
title: YAML Front matter
description: This is a page
---
<h1>{{title}}</h1>
```

then running the following in the command line:

```js
matter('abc.html');
```
returns

```json
{
  "data": {
    "title": "YAML Front matter",
    "description": "This is a page"
  },
  "content": "<h1>{{title}}</h1>",
  "original": "---\ntitle: YAML Front matter\n---\n<h1>{{title}}</h1>"
}
```

## Benchmarks

**Blog**

The following benchmarks reflect the processing time for all markdown posts in the [bootstrap-blog].

```
front-matter.js x 271 ops/sec ±2.68% (80 runs sampled)
gray-matter.js x 4,294 ops/sec ±0.86% (91 runs sampled)
```

**Misc**

gray-matter is 12-20x faster than [front-matter] when content or front matter actually exist.

```bash
#1: complex.js
  front-matter.js x 433 ops/sec ±1.21% (91 runs sampled)
  gray-matter.js x 9,491 ops/sec ±1.07% (92 runs sampled)

#2: empty.js
  front-matter.js x 5,744,976 ops/sec ±0.76% (99 runs sampled)
  gray-matter.js x 18,048,669 ops/sec ±0.84% (93 runs sampled)

#3: matter.js
  front-matter.js x 10,739 ops/sec ±2.65% (84 runs sampled)
  gray-matter.js x 201,322 ops/sec ±0.71% (93 runs sampled)

#4: no-content.js
  front-matter.js x 13,097 ops/sec ±3.00% (82 runs sampled)
  gray-matter.js x 198,441 ops/sec ±0.49% (101 runs sampled)

#5: no-matter.js
  front-matter.js x 5,420,088 ops/sec ±0.79% (96 runs sampled)
  gray-matter.js x 9,559,091 ops/sec ±1.33% (92 runs sampled)
```


## Why?

> Why another YAML Front Matter library?

Because other libraries we tried failed to meet our requirements with [Assemble](http://assemble.io). Some most of the libraries met most of the requirements, but _none had all of them_. Here are the most important:

* Be usable, if not simple
* Allow custom delimiters
* Use a dependable and well-supported library for parsing YAML and other languages
* Don't fail when no content exists
* Don't fail when no front matter exists
* Have no problem reading YAML files directly
* Have no problem with complex content, including fenced code blocks that contain examples of YAML front matter. Other parsers fail on this.
* Should return an object that contains the parsed YAML front matter and content, as well as the "original" content.


## Running tests
Install dev dependencies.

```bash
npm i -d && npm test
```



## Authors

**Jon Schlinkert**
 
+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert) 


## License
Copyright (c) 2015 Jon Schlinkert  
Released under the MIT license

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on March 10, 2015._


[js-yaml]: https://github.com/nodeca/js-yaml
[coffee-script]: https://github.com/jashkenas/coffeescript
[toml-node]: https://github.com/BinaryMuse/toml-node
[bootstrap-blog]: https://github.com/twbs/bootstrap-blog/tree/gh-pages/_posts