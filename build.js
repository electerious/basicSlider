'use strict'

const { writeFile } = require('fs').promises
const js = require('rosid-handler-js')
const sass = require('rosid-handler-sass')

sass('src/styles/main.scss', {

	optimize: true

}).then((data) => {

	return writeFile('dist/basicSlider.min.css', data)

})

sass('src/styles/themes/default.scss', {

	optimize: true

}).then((data) => {

	return writeFile('dist/themes/default.min.css', data)

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

	return writeFile('dist/basicSlider.min.js', data)

})