'use babel'

import ReactDOMServer from 'react-dom/server'

const stringify = value => {
	if (value === null || value === undefined) {
		return
	}

	if (value.__type === 'arrow') {
		return 'arrow'
	} else if (value.__type === 'function') {
		return 'function'
	} else if (value.__type === 'object') {
		return Object.keys(value).reduce((acc, key) => {
			acc[key] = stringify(value[key])
			return acc
		}, {})
	} else if (value.__type === 'array') {
		return value.map(stringify)
	} else if (value.type && value.props) {
		return ReactDOMServer(value)
	} else if (typeof value === 'function') {
		return 'function'
	}

	console.info(
		`Consider extening stringify for object of type: ${typeof value} and __type: ${value.__type}`
	)
	return value
}

export default stringify
