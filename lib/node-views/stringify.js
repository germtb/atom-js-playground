'use babel'

import React from 'react'

const stringify = value => {
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
				acc[key] = stringify(value[key])
				return acc
			}, {}),
			null,
			2
		)
	} else if (value.__type === 'array') {
		return value.map(stringify)
	} else if (value.type && value.props) {
		return <div>{value}</div>
	} else if (typeof value === 'function') {
		return 'function'
	} else if (typeof value === 'object') {
		return JSON.stringify(
			Object.keys(value).reduce((acc, key) => {
				acc[key] = stringify(value[key])
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
		`Consider extening stringify for object of type: ${typeof value} and __type: ${value.__type}`
	)
	return value
}

export default stringify
