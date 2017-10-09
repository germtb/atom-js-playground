'use babel'

import React from 'react'

const reactify = value => {
	if (value === null || value === undefined) {
		return
	}

	if (value.__type === 'arrow') {
		return 'arrow'
	} else if (value.__type === 'function') {
		return 'function'
	} else if (value.__type === 'object') {
		return JSON.stringify(
			Object.keys(value).reduce((acc, key) => {
				acc[key] = reactify(value[key])
				return acc
			}, {}),
			null,
			2
		)
	} else if (value.__type === 'array') {
		return <div>{value.map(reactify)}</div>
	} else if (value.type && value.props) {
		return <div>{value}</div>
	} else if (typeof value === 'function') {
		return 'function'
	} else if (typeof value === 'object') {
		return JSON.stringify(
			Object.keys(value).reduce((acc, key) => {
				acc[key] = reactify(value[key])
				return acc
			}, {}),
			null,
			2
		)
	} else if (typeof value === 'string') {
		return value
	} else if (typeof value === 'number') {
		return value
	}

	console.info(
		`Consider extening reactify for object of type: ${typeof value} and __type: ${value.__type}`
	)
	return value
}

export default reactify
