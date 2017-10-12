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
			const key = node.computed
				? aval(node.property, scopes)
				: node.property.name

			let proto = obj
			let property
			while (proto) {
				if (key in proto) {
					property = proto[key]
				}
				proto = proto.__proto
			}

			if (typeof property === 'function') {
				return property.bind(obj)
			}

			return property
		},
		ObjectMethod: (node, scopes) => {
			return {
				[node.key.name]: createFunctionExpression(node, scopes)
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
