'use babel'

const visitorsFactory = ({ aval, get, createFunctionExpression }) => {
	return {
		ObjectExpression: (node, scopes) => {
			const obj = node.properties.reduce((acc, property) => {
				const avaledProperty = aval(property, scopes)
				return { ...acc, ...avaledProperty }
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
				[node.computed ? aval(node.key, scopes) : node.key.name]: aval(
					node.value,
					scopes
				)
			}
		},
		SpreadProperty: (node, scopes) => {
			return get(node.argument.name, scopes)
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
		SpreadElement: (node, scopes) => {
			return get(node.argument.name, scopes)
		},
		ArrayExpression: (node, scopes) => {
			const array = []
			node.elements.forEach(element => {
				const avaledElement = aval(element, scopes)
				if (element.type === 'SpreadElement') {
					array.push(...avaledElement)
				} else {
					array.push(avaledElement)
				}
			})

			Object.defineProperty(array, '__type', {
				enumerable: false,
				writable: false,
				value: 'array'
			})

			return array
		}
	}
}

export default visitorsFactory
