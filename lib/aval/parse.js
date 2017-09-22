'use babel'

import * as babylon from 'babylon'

export function parse(text) {
	try {
		return babylon.parse(text, {
			sourceType: 'module',
			plugins: [
				'objectRestSpread',
				'asyncGenerators',
				'jsx',
				'classProperties',
				'exportExtensions'
			]
		})
	} catch (e) {
		// console.info(e)
	}
}
