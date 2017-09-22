const visitorsFactory = dependencies => {
	const { aval, get, update, updateName, updateArray } = dependencies
	return {
		ObjectExpression: (node, scopes) => {
			return node.properties.reduce((acc, property) => {
				const { key, value } = aval(property, scopes)
				acc[key] = value
				return acc
			}, {})
		},
		ObjectProperty: (node, scopes) => {
			return {
				key: node.computed ? aval(node.key, scopes) : node.key.name,
				value: aval(node.value, scopes)
			}
		},
		MemberExpression: (node, scopes) => {
			const obj = get(node.object.name, scopes)
			return node.computed
				? obj[aval(node.property, scopes)]
				: obj[node.property.name]
		},
		ObjectMethod: (node, scopes) => {
			console.info('NullLiteral not supported yet')
		},
		ArrayExpression: (node, scopes) => {
			return node.elements.map(element => aval(element, scopes))
		}
	}
}

export default visitorsFactory
