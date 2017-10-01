'use babel'

const visitorsFactory = ({ aval, get, createFunctionExpression }) => {
	return {
		ObjectExpression: (node, scopes) => {
			const obj = node.properties.reduce((acc, property) => {
				const { key, value } = aval(property, scopes)
				acc[key] = value
				return acc
			}, {})

			Object.defineProperty(obj, '__type', {
				enumerable: false,
				writable: false,
				value: 'object'
			})

			return obj
		},
		ObjectProperty: (node, scopes) => {
			return {
				key: node.computed ? aval(node.key, scopes) : node.key.name,
				value: aval(node.value, scopes)
			}
		},
		MemberExpression: (node, scopes) => {
			const obj = aval(node.object, scopes)

			const property = node.computed
				? obj[aval(node.property, scopes)]
				: obj[node.property.name]

			if (typeof property === 'function') {
				return property.bind(obj)
			}

			return property
		},
		ObjectMethod: (node, scopes) => {
			return {
				key: node.key.name,
				value: createFunctionExpression(node, scopes)
			}
		},
		ArrayExpression: (node, scopes) => {
			const obj = node.elements.map(element => aval(element, scopes))

			Object.defineProperty(obj, '__type', {
				enumerable: false,
				writable: false,
				value: 'array'
			})

			return obj
		}
	}
}

export default visitorsFactory
