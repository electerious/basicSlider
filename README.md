# hSlider

A Responsive & Touch-friendly Javascript Slider, only 2.01KB gzipped.

> This is a jQuery wrapper of [basicSlider](https://github.com/electerious/basicSlider) with added features like Responsive and Touch-friendliness.

## Contents

- [Codepen Demos](https://codepen.io/hrsetyono/pen/ebbeJJ)
- [Setup](#setup)
- [Options](#options)
- [API](#api)
- [Requirements](#requirements)

## Setup

1. Include the CSS files before `</head>`. Change the path to fit your project directory.

	```html
	<link rel="stylesheet" href="dist/hslider.min.css">
	```

1. Include the JS files before `</body>`. You can ignore the jQuery if you already added it.

	```html
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<script src="dist/hslider.min.js"></script>
	```

1. Apply hSlider to the container.

	```html
	<div class="my-gallery">
		<img src="...">
		<img src="...">
		<img src="...">
		<img src="...">
	</div>
	```

	```js
	$(document).ready( function() {

		var instance = $('.my-gallery').hSlider({
			itemsPerSlide: 3,
			responsive: {
				767: 2,
				480: 1
			}
		});

	});
	```

## Options

Available options for hSlider are:

- **index** - The starting slide. Default: 0.
- **arrows** - Show or hide the arrows. Default: true.
- **dots** - Show or hide the pagination. Default: true.
- **touch** - Enable or disable the swipe gesture. Default: true.

- **itemsPerSlide** - Number of items per slide. Default: 1.
- **responsive** - Number of items when reaching certain breakpoint. Default: null.

- **beforeChange** - Callback before moving to another slide. Parameters: `( instance, newIndex, oldIndex )`
- **afterChange** - Callback after moving to another slide. Parameters: `( instance, newIndex, oldIndex )`

## API

In example above, we stored the hSlider in `instance` variable. We can use that to perform certain actions.

- **.element()** - Returns the DOM element/node object associated with the instance.

	```js
	var slides = instance.element().querySelector( '.hSlider-slides' );
	// or use it with jQuery
	var slides = $( instance.element() ).find( '.hSlider-slides' );
	```

- **.length()** - Returns the total number of slides.

- **.current()** - Returns the current slide index (start from 0).

- **.goto( index )** - Navigate to selected slide.

	```js
	instance.goto( 1 );
	```

- **.prev()** - Navigate to previous slide. If currently on first slide, it will go to last slide.

- **.next()** - Navigate to next slide. If currently on last slide, it will go to first slide.

## Requirements

hSlider depends on **jQuery**. Tested working on version 1.12.4.

hSlider also depends on the following browser APIs:

- [Object.assign](http://www.ecma-international.org/ecma-262/6.0/#sec-object.assign)
- [Number.isFinite](http://www.ecma-international.org/ecma-262/6.0/#sec-number.isfinite)

Some of these APIs are capable of being polyfilled in older browsers. Check the linked resources above to determine if you must polyfill to achieve your desired level of browser support.