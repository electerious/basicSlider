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

	if (Number.isFinite(opts.index)===false) opts.index = 0

	if (opts.arrows!==false) opts.arrows = true
	if (opts.dots!==false)   opts.dots = true

	if (typeof opts.beforeChange !== 'function') opts.beforeChange = () => {}
	if (typeof opts.afterChange !== 'function')  opts.afterChange = () => {}

	return opts

}

const renderSlider = function(elem, elemsCollection, opts) {

	const {
		arrowLeftElem,
		arrowRightElem,
		dotsElem,
		containerElem
	} = elemsCollection

	// Add default class
	elem.classList.add('basicSlider')

	// Clear existing content
	elem.innerHTML = ''

	// Insert slider content
	elem.appendChild(containerElem)

	// Insert arrows at the end so they stay clickable
	if (opts.arrows===true) {
		elem.appendChild(arrowLeftElem)
		elem.appendChild(arrowRightElem)
	}

	// Insert dots at the end so they stay clickable
	if (opts.dots===true) {
		elem.appendChild(dotsElem)
	}

}

const renderArrow = function(direction, fn) {

	const elem = document.createElement('button')

	// Only allow left and right arrows
	direction = (direction===ARROW_LEFT ? 'left' : 'right')

	// Add the default and direction class
	elem.classList.add('basicSlider__arrow')
	elem.classList.add(`basicSlider__arrow--${ direction }`)

	// Bind click event
	elem.onclick = (e) => {
		fn()
		stopEvent(e)
	}

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

const renderDot = function(fn) {

	const elem = document.createElement('button')

	// Add default class
	elem.classList.add('basicSlider__dot')

	// Bind click event
	elem.onclick = (e) => {
		fn()
		stopEvent(e)
	}

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

const setSlide = function(elemsCollection, index, length) {

	const {
		slidesElem,
		dotElems
	} = elemsCollection

	slidesElem.style.transform = `translateX(-${ (100 / length) * index }%)`

	dotElems.forEach((dotElem) => dotElem.classList.remove('active'))
	dotElems[index].classList.add('active')

}

export const create = function(elem, slides, opts) {

	// Validate options
	opts = validate(opts)

	// Slide index counter
	let c = null

	// Object containing references to all rendered elements
	const elemsCollection = {}

	// Initializes the slider
	const init = () => {

		// Initialize slide counter
		c = counter(0, _length() - 1, opts.index)

		// Render all elements
		elemsCollection.slideElems     = slides.map(renderSlide)
		elemsCollection.dotElems       = slides.map((_, i) => renderDot(_goto.bind(null, i)))
		elemsCollection.dotsElem       = renderDots(elemsCollection.dotElems)
		elemsCollection.slidesElem     = renderSlides(elemsCollection.slideElems)
		elemsCollection.containerElem  = renderContainer(elemsCollection.slidesElem)
		elemsCollection.arrowLeftElem  = renderArrow(ARROW_LEFT, _prev)
		elemsCollection.arrowRightElem = renderArrow(ARROW_RIGHT, _next)

		// Set initial slide
		_goto(c(), null)

		// Modify the target elem
		// Adds required classes and replaces its content
		renderSlider(elem, elemsCollection, opts)

	}

	// Returns the slider element
	const _element = () => elem

	// Return the total number of slides
	const _length = () => slides.length

	// Returns the current slide index and element
	const _current = () => c()

	// Navigate to a given slide
	// Use c() as the default oldIndex as the counter hasn't been recreated yet,
	// when called through the API. Internal functions can set a custom oldIndex.
	const _goto = (newIndex, oldIndex = c()) => {

		// Run beforePrev event
		// Stop execution when function returns false
		if (opts.beforeChange(instance, newIndex, oldIndex)===false) return false

		// Recreate counter with new initial value
		c = counter(0, _length() - 1, newIndex)

		// Switch to new slide
		setSlide(elemsCollection, c(), _length())

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