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

	return opts

}

const renderSlider = function(renderedElems) {

	const {
		sliderElem,
		containerElem,
		arrowLeftElem,
		arrowRightElem
	} = renderedElems

	// Add the default class
	sliderElem.classList.add('basicSlider')

	// Clear existing content
	sliderElem.innerHTML = ''

	// Insert slider content
	sliderElem.appendChild(containerElem)
	sliderElem.appendChild(arrowLeftElem)
	sliderElem.appendChild(arrowRightElem)

}

const renderContainer = function(slidesElem) {

	const elem = document.createElement('div')

	// Add the default class
	elem.classList.add('basicSlider__container')

	// Insert container content
	elem.appendChild(slidesElem)

	return elem

}

const renderSlides = function(slideElems = []) {

	const elem = document.createElement('div')

	// Add the default class
	elem.classList.add('basicSlider__slides')

	// Set width to the number of slides
	// Each slide should have a width of 100% available
	elem.style.width = `${ slideElems.length * 100 }%`

	// Add slides
	// console.log(slideElems);
	slideElems.forEach((slideElem) => elem.appendChild(slideElem))

	return elem

}

const renderSlide = function(html = '') {

	const elem = document.createElement('div')

	// Add the default class
	elem.classList.add('basicSlider__slide')

	// Add slide content
	elem.innerHTML = html

	return elem

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

		// Modify the target elem
		// Adds required classes and replaces its content
		renderSlider({
			sliderElem     : elem,
			containerElem  : containerElem,
			arrowLeftElem  : arrowLeftElem,
			arrowRightElem : arrowRightElem
		})

	}

	// Returns the slider element
	const _element = () => elem

	// Return the total number of slides
	const _length = () => slides.length

	// Returns the current slide index and element
	const _current = () => current(elem, c())

	// Navigate to a given slide
	const _goto = (index) => {

		// Recreate counter with new initial value
		c = counter(min, max, index)

		return goto(elem, c(), _length())

	}

	// Navigate to the previous slide
	const _prev = () => _goto(c(-1))

	// Navigate to the next slide
	const _next = () => _goto(c(1))

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