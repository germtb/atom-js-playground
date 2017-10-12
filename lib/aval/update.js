'use babel'

export default ({ aval, get, getThis }) => {
	const update = (node, value, scopes) => {
		if (node.name) {
			updateName(node.name, value, scopes)
		} else {
			updateObject(node, value, scopes)
		}
	}
	const updateName = (name, value, scopes) => {
		for (let i = scopes.length - 1; i >= 0; i--) {
			if (name in scopes[i]) {
				scopes[i][name] = value
			}
		}
	}

	const updateObject = (node, value, scopes) => {
		let object
		if (node.object.type === 'ThisExpression') {
			object = getThis(scopes)
		} else {
			const objectName = node.object.name
			object = get(objectName, scopes)
		}
		const key = node.computed ? aval(node.property, scopes) : node.property.name
		object[key] = value
	}

	return {
		update,
		updateName
	}
}
