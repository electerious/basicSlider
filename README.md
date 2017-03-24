# basicSlider

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
| Touch | Slider with swipe support. | [Demo](demos/touch.html) |

## Features

- Works in all modern browsers
- Zero dependencies
- CommonJS and AMD support
- Works with all kind of content
- Simple JS API
- No fancy shit, just a slider in its purest form

## Requirements

basicSlider depends on the following browser APIs:

- [classList](https://dom.spec.whatwg.org/#dom-element-classlist)
- [Flexible Box Layout Module](https://www.w3.org/TR/css3-flexbox/)
- [Object.assign](http://www.ecma-international.org/ecma-262/6.0/#sec-object.assign)

Some of these APIs are capable of being polyfilled in older browsers. Check the linked resources above to determine if you must polyfill to achieve your desired level of browser support.

## Setup

We recommend to install basicSlider using [Bower](https://bower.io/) or [npm](https://npmjs.com).

```sh
bower install basicSlider
```

```sh
npm install basicslider
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
	index  : 1,
	arrows : false
})
```

Parameters:

- `elem` `{Node}` The element which should contain the slider.
- `slides` `{Array}` Array of strings. Each item represents one slide. Any kind of HTML is allowed.
- `opts` `{?Object}` An object of [options](#options).

Returns:

- `{Object}` The created instance.

## Instance API

Each basicSlider instance has a handful of handy functions. Below are all of them along with a short description.

### .element()

Returns the Node object associated with the instance.

Example:

```js
const elem = instance.element()
```

Returns:

- `{Node}` Node object associated with the instance.

### .length()

Returns the total number of slides.

Example:

```js
const length = instance.length()
```

Returns:

- `{Integer}` Total number of slides.

### .current()

Returns the current slide index.

Example:

```js
const current = instance.current()
```

Returns:

- `{Integer}` Current slide index.

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
	beforeChange  : (instance, newIndex, oldIndex) => {},
	afterChange   : (instance, newIndex, oldIndex) => {}
}
```

## Themes

Layout and theme are separated CSS files. This makes it easy to style your own slider or to choose from the included themes.

| Name | Demo |
|:-----------|:------------|
| Default theme | [Demo](http://codepen.io/electerious/pen/GjpXRX) |
