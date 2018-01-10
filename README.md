# html-template-tag

[![version](https://img.shields.io/npm/v/html-template-tag.svg)](http://npm.im/html-template-tag)
[![Travis](https://img.shields.io/travis/AntonioVdlC/html-template-tag.svg?branch=master)](https://travis-ci.org/AntonioVdlC/html-template-tag)
[![Codecov](https://img.shields.io/codecov/c/github/AntonioVdlC/html-template-tag.svg)](https://codecov.io/github/AntonioVdlC/html-template-tag)
[![issues](https://img.shields.io/github/issues-raw/antoniovdlc/html-template-tag.svg)](https://github.com/AntonioVdlC/html-template-tag/issues)
[![downloads](https://img.shields.io/npm/dt/html-template-tag.svg)](http://npm.im/html-template-tag)
[![license](https://img.shields.io/npm/l/html-template-tag.svg)](http://opensource.org/licenses/MIT)

ES6 Tagged Template for compiling HTML template strings.

## Installation

This package is distributed via npm:

```
npm install html-template-tag
```

*- or -*

Download the file `src/index.js` and add it to your ES6 project.

## Usage

### String Interpolation

At its core, this module just performs simple ES6 string interpolation.

```javascript
var html = require("html-template-tag");
// - or - import html from "html-template-tag";

var name = `Antonio`;
var string = html`Hello, ${name}!`;
// "Hello, Antonio!"
```

Nevertheless, it escapes HTML special characters without refraining its use in loops!

```javascript
var html = require("html-template-tag");
// - or - import html from "html-template-tag";

var names = ["Antonio", "Megan", "/><script>alert('xss')</script>"];
var string = html`
	<ul>
		${names.map((name) => html`
			<li>Hello, ${name}!</li>
		`)}
	</ul>
`;
// "<ul><li>Hello, Antonio!</li><li>Hello, Megan!</li><li>Hello, /&gt;&lt;script&gt;alert(&#39;xss&#39;)&lt;/script&gt;!</li></ul>"
```

### Skip autoscaping

You can use double dollar signs in interpolation to mark the value as safe (which means that this variable will not be escaped).

```javascript
var name = `<strong>Antonio</strong>`;
var string = html`Hello, $${name}!`;
// "Hello, <strong>Antonio</strong>!"
```



### HTML Template Pre-Compiling

This small module can also be used to pre-compile HTML templates:

```javascript
var html = require("html-template-tag");
// - or - import html from "html-template-tag";

var data = {
	count: 2,
	names: ["Antonio", "Megan"]
};

var template = ({names}) => html`
	<ul>
		${names.map((name) => html`
			<li>Hello, ${name}!</li>
		`)}
	</ul>
`;

var string = template(data);
/* 
	"
	<ul>
		<li>Hello, Antonio!</li>
		<li>Hello, Megan!</li>
	</ul>
	"
*/
```
> NB: The formating of the string literal is kept.

## License
MIT

## Thanks
The code for this module has been heavily inspired on [Axel Rauschmayer's post on HTML templating with ES6 template strings](http://www.2ality.com/2015/01/template-strings-html.html) and [Stefan Bieschewski's comment](http://www.2ality.com/2015/01/template-strings-html.html#comment-2078932192).