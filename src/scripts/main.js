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

const renderSlider = function(elem, refs, opts) {

	const {
		arrowLeftElem,
		arrowRightElem,
		dotsElem,
		containerElem
	} = refs

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

const setSlide = function(dotElems, slidesElem, index, length) {

	slidesElem.style.transform = `translateX(-${ (100 / length) * index }%)`

	dotElems.forEach((dotElem) => dotElem.classList.remove('active'))
	dotElems[index].classList.add('active')

}

const init = function(elem, slides, instance, opts) {

	// Initialize slide counter
	const c = counter(0, instance.length() - 1, opts.index)

	// Object containing references to all rendered elements
	const refs = {}

	// Render all elements
	refs.slideElems     = slides.map(renderSlide)
	refs.dotElems       = slides.map((_, i) => renderDot(instance.goto.bind(null, i)))
	refs.dotsElem       = renderDots(refs.dotElems)
	refs.slidesElem     = renderSlides(refs.slideElems)
	refs.containerElem  = renderContainer(refs.slidesElem)
	refs.arrowLeftElem  = renderArrow(ARROW_LEFT, instance.prev)
	refs.arrowRightElem = renderArrow(ARROW_RIGHT, instance.next)

	// Set initial slide
	setSlide(refs.dotElems, refs.slidesElem, c(), instance.length())

	// Modify the target elem
	// Adds required classes and replaces its content
	renderSlider(elem, refs, opts)

	return {
		c,
		refs
	}

}

export const create = function(elem, slides, opts) {

	// Validate options
	opts = validate(opts)

	// Slide index counter
	let c = null

	// Object containing references to all rendered elements
	let refs = null

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
		setSlide(refs.dotElems, refs.slidesElem, c(), _length())

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
	const initial = init(elem, slides, instance, opts)

	// Use returned values for initialization as those will be used
	// in functions of the instance
	c    = initial.c
	refs = initial.refs

	return instance

}