'use strict'

const { writeFile } = require('fs')
const { promisify } = require('util')
const js = require('rosid-handler-js')
const sass = require('rosid-handler-sass')
const save = promisify(writeFile)

sass('src/styles/main.scss', {

	optimize: true

}).then((data) => {

	return save('dist/basicSlider.min.css', data)

})

sass('src/styles/themes/default.scss', {

	optimize: true

}).then((data) => {

	return save('dist/themes/default.min.css', data)

})

js('src/scripts/main.js', {

	optimize: true,
	babel: {
		presets: [ '@babel/preset-env' ],
		babelrc: false,
		global: true
	},
	browserify: {
		standalone: 'basicSlider'
	}

}).then((data) => {

	return save('dist/basicSlider.min.js', data)

})