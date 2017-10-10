'use babel'

import React from 'react'

import { TAB } from '../constants'

const reactify = (value, tabulation = '') => {
	if (value === null || value === undefined) {
		return
	}

	if (typeof value === 'object') {
		if (value.__visited) {
			return '...'
		}

		Object.defineProperty(value, '__visited', {
			enumerable: false,
			writable: false,
			value: true
		})
	}

	if (value.__type === 'arrow') {
		return 'arrow'
	} else if (value.__type === 'function') {
		return 'function'
	} else if (value.__type === 'object') {
		return (
			<div>
				{`${tabulation}{`}
				{Object.keys(value).map(key => {
					return (
						<div>
							{`${tabulation + TAB}${key}: `}
							{reactify(value[key], tabulation + TAB)}
						</div>
					)
				})}
				{`${tabulation}}`}
			</div>
		)
	} else if (value.__type === 'array') {
		return <div>[{value.map(reactify)}]</div>
	} else if (value.type && value.props) {
		return <div>{value}</div>
	} else if (typeof value === 'function') {
		return 'function'
	} else if (typeof value === 'object') {
		return (
			<div>
				{`${tabulation}{`}
				{Object.keys(value).map(key => {
					return (
						<div>
							{`${tabulation + TAB}${key}: `}
							{reactify(value[key], tabulation + TAB)}
						</div>
					)
				})}
				{`${tabulation}}`}
			</div>
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
