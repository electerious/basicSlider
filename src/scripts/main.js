const ARROW_LEFT  = 'left'
const ARROW_RIGHT = 'right'

const counter = function(min, max, initial) {

	let index  = initial - min
	let length = max - min + 1

	return (modifier = 0) => {

		index = (index + modifier) % length

		if (index>=0) index = 0 + index
		if (index<0)  index = length + index

		return min + index

	}

}

const stopEvent = function(e) {

	if (typeof e.stopPropagation === 'function') e.stopPropagation()
	if (typeof e.preventDefault === 'function')  e.preventDefault()

}

const validate = function(opts = {}) {

	opts = Object.assign({}, opts)

	if (opts.arrows!==false) opts.arrows = true
	if (opts.dots!==false)   opts.dots = true

	if (typeof opts.beforeChange !== 'function') opts.beforeChange = () => {}
	if (typeof opts.afterChange !== 'function')  opts.afterChange = () => {}

	return opts

}

const renderSlider = function(elems, opts) {

	const {
		sliderElem,
		arrowLeftElem,
		arrowRightElem,
		dotsElem,
		containerElem
	} = elems

	// Add default class
	sliderElem.classList.add('basicSlider')

	// Clear existing content
	sliderElem.innerHTML = ''

	// Insert slider content
	sliderElem.appendChild(containerElem)

	// Insert arrows at the end so they stay clickable
	if (opts.arrows===true) {
		sliderElem.appendChild(arrowLeftElem)
		sliderElem.appendChild(arrowRightElem)
	}

	// Insert dots at the end so they stay clickable
	if (opts.dots===true) {
		sliderElem.appendChild(dotsElem)
	}

}

const renderArrow = function(direction) {

	const elem = document.createElement('button')

	// Only allow left and right arrows
	direction = (direction===ARROW_LEFT ? 'left' : 'right')

	// Add the default and direction class
	elem.classList.add('basicSlider__arrow')
	elem.classList.add(`basicSlider__arrow--${ direction }`)

	return elem

}

const renderDots = function(dotElems = []) {

	const elem = document.createElement('div')

	// Add default class
	elem.classList.add('basicSlider__dots')

	// Add dots
	dotElems.forEach((dotElem) => elem.appendChild(dotElem))

	return elem

}

const renderDot = function() {

	const elem = document.createElement('button')

	// Add default class
	elem.classList.add('basicSlider__dot')

	return elem

}

const renderContainer = function(slidesElem) {

	const elem = document.createElement('div')

	// Add default class
	elem.classList.add('basicSlider__container')

	// Insert container content
	elem.appendChild(slidesElem)

	return elem

}

const renderSlides = function(slideElems = []) {

	const elem = document.createElement('div')

	// Add default class
	elem.classList.add('basicSlider__slides')

	// Set width to the number of slides
	// Each slide should have a width of 100% available
	elem.style.width = `${ slideElems.length * 100 }%`

	// Add slides
	slideElems.forEach((slideElem) => elem.appendChild(slideElem))

	return elem

}

const renderSlide = function(html = '') {

	const elem = document.createElement('div')

	// Add default class
	elem.classList.add('basicSlider__slide')

	// Add slide content
	elem.innerHTML = html

	return elem

}

const current = function(elem, index) {

	return {
		index   : index,
		element : elem.querySelector(`.basicSlider__slide:nth-child(${ index + 1 })`)
	}

}

const goto = function(elem, index, length) {

	const slidesElem = elem.querySelector('.basicSlider__slides')

	slidesElem.style.transform = `translateX(-${ (100 / length) * index }%)`

}

export const create = function(elem, slides, opts) {

	// Validate options
	opts = validate(opts)

	// Number of slides
	let min = null
	let max = null
	let c   = null

	// Initializes the slider
	const init = () => {

		// Set number of slides and create counter
		min = 0
		max = _length() - 1
		c   = counter(min, max, min)

		// Render all elements
		const slideElems     = slides.map(renderSlide)
		const dotElems       = slides.map(renderDot)
		const dotsElem       = renderDots(dotElems)
		const slidesElem     = renderSlides(slideElems)
		const containerElem  = renderContainer(slidesElem)
		const arrowLeftElem  = renderArrow(ARROW_LEFT)
		const arrowRightElem = renderArrow(ARROW_RIGHT)

		// Bind prev button event
		arrowLeftElem.onclick = (e) => {
			_prev()
			stopEvent(e)
		}

		// Bind next button event
		arrowRightElem.onclick = (e) => {
			_next()
			stopEvent(e)
		}

		// Bind dot events
		dotElems.forEach((dotElem, index) => {

			dotElem.onclick = (e) => {
				_goto(index)
				stopEvent(e)
			}

		})

		// Modify the target elem
		// Adds required classes and replaces its content
		renderSlider({
			sliderElem     : elem,
			arrowLeftElem  : arrowLeftElem,
			arrowRightElem : arrowRightElem,
			dotsElem       : dotsElem,
			containerElem  : containerElem
		}, opts)

	}

	// Returns the slider element
	const _element = () => elem

	// Return the total number of slides
	const _length = () => slides.length

	// Returns the current slide index and element
	const _current = () => current(elem, c())

	// Navigate to a given slide
	// Use c() as the default oldIndex as the counter hasn't been recreated yet,
	// when called through the API. Internal functions can set a custom oldIndex.
	const _goto = (newIndex, oldIndex = c()) => {

		// Run beforePrev event
		// Stop execution when function returns false
		if (opts.beforeChange(instance, newIndex, oldIndex)===false) return false

		// Recreate counter with new initial value
		c = counter(min, max, newIndex)

		// Switch to new slide
		goto(elem, c(), _length())

		// Run afterShow event
		opts.afterChange(instance, newIndex, oldIndex)

	}

	// Navigate to the previous slide
	const _prev = () => {

		// Store old index before modifying the counter
		const oldIndex = c()
		const newIndex = c(-1)

		_goto(newIndex, oldIndex)

	}

	// Navigate to the next slide
	const _next = () => {

		// Store old index before modifying the counter
		const oldIndex = c()
		const newIndex = c(1)

		_goto(newIndex, oldIndex)

	}

	// Assign instance to a variable so the instance can be used
	// elsewhere in the current function
	const instance = {
		element : _element,
		length  : _length,
		current : _current,
		goto    : _goto,
		prev    : _prev,
		next    : _next
	}

	// Initialize slider
	init()

	return instance

}