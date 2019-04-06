# basicSlider

[![Dependencies](https://david-dm.org/electerious/basicslider.svg)](https://david-dm.org/electerious/basicslider.svg#info=dependencies) [![Donate via PayPal](https://img.shields.io/badge/paypal-donate-009cde.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CYKBESW577YWE)

A slider in its purest form.

## Contents

- [Demos](#demos)
- [Features](#features)
- [Requirements](#requirements)
- [Setup](#setup)
- [API](#api)
- [Instance API](#instance-api)
- [Options](#options)
- [Themes](#themes)

## Demos

| Name | Description | Link |
|:-----------|:------------|:------------|
| Default | All features with the default theme. | [Try it on CodePen](http://codepen.io/electerious/pen/GjpXRX) |
| Responsive | Responsive slider with dynamic content. | [Try it on CodePen](http://codepen.io/electerious/pen/aJKyxx) |
| Emoji | Default theme with emojis. | [Try it on CodePen](http://codepen.io/electerious/pen/MpXEVd) |
| Touch | Slider with swipe support. | [Try it on CodePen](https://codepen.io/electerious/pen/vWMXoL) |

## Features

- Works in all modern browsers and IE11 ([with polyfills](#requirements))
- Supports any kind of content
- No fancy shit, just a slider in its purest form
- Zero dependencies
- CommonJS and AMD support
- Simple JS API

## Requirements

basicSlider depends on the following browser APIs:

- [Object.assign](http://www.ecma-international.org/ecma-262/6.0/#sec-object.assign)
- [Number.isFinite](http://www.ecma-international.org/ecma-262/6.0/#sec-number.isfinite)

Some of these APIs are capable of being polyfilled in older browsers. Check the linked resources above to determine if you must polyfill to achieve your desired level of browser support.

## Setup

We recommend installing basicSlider using [npm](https://npmjs.com) or [yarn](https://yarnpkg.com).

```sh
npm install basicslider
```

```sh
yarn add basicslider
```

Include the CSS file in the `head` tag and the JS file at the end of your `body` tag…

```html
<link rel="stylesheet" href="dist/basicSlider.min.css">
<link rel="stylesheet" href="dist/themes/default.min.css">
```

```html
<script src="dist/basicSlider.min.js"></script>
```

…or skip the JS file and use basicSlider as a module:

```js
const basicSlider = require('basicslider')
```

```js
import * as basicSlider from 'basicslider'
```

## API

### .create(elem, slides, opts)

Creates a new basicSlider instance.

Be sure to assign your instance to a variable. Using your instance, you can…

* …get the current slide.
* …navigate back and forward.
* …goto a specific slide.

Examples:

```js
const instance = basicSlider.create(document.querySelector('#slider'), [
	'Slide 1',
	'Slide 2',
	'Slide 3'
])
```

```js
const instance = basicSlider.create(document.querySelector('#slider'), [
	'<p>Slide 1 with HTML</p>',
	'<p>Slide 2 with HTML</p>',
	'<p>Slide 3 with HTML</p>'
], {
	index: 1,
	arrows: false
})
```

Parameters:

- `elem` `{Node}` The DOM element/node which should contain the slider.
- `slides` `{Array}` Array of strings. Each item represents one slide. Any kind of HTML is allowed.
- `opts` `{?Object}` An object of [options](#options).

Returns:

- `{Object}` The created instance.

## Instance API

Each basicSlider instance has a handful of handy functions. Below are all of them along with a short description.

### .element()

Returns the DOM element/node object associated with the instance.

Example:

```js
const elem = instance.element()
```

Returns:

- `{Node}` DOM element/node associated with the instance.

### .length()

Returns the total number of slides.

Example:

```js
const length = instance.length()
```

Returns:

- `{Number}` Total number of slides.

### .current()

Returns the current slide index.

Example:

```js
const current = instance.current()
```

Returns:

- `{Number}` Current slide index.

### .goto()

Navigates to a slide by index and executes the beforeChange and afterChange callback functions.

Example:

```js
instance.goto(0)
```

### .prev()

Navigates to the previous slide and executes the beforeChange and afterChange callback functions.

Example:

```js
instance.prev()
```

### .next()

Navigates to the next slide and executes the beforeChange and afterChange callback functions.

Example:

```js
instance.next()
```

## Options

The option object can include the following properties:

```js
{
	/*
	 * Initial slide.
	 */
	index: 0,
	/*
	 * Show or hide prev/next arrows.
	 */
	arrows: true,
	/*
	 * Show or hide dot indicators.
	 */
	dots: true,
	/*
	 * Callback functions.
	 * Returning false will stop the caller function and prevent the slider from changing.
	 */
	beforeChange: (instance, newIndex, oldIndex) => {},
	afterChange: (instance, newIndex, oldIndex) => {}
}
```

## Themes

Layout and theme are separated CSS files. This makes it easy to style your own slider or to choose from the included themes.

| Name | Demo |
|:-----------|:------------|
| Default theme | [Demo](http://codepen.io/electerious/pen/GjpXRX) |