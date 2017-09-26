'use babel'

export default ({ aval, get }) => {
	const update = (node, value, scope) => {
		if (node.name) {
			updateName(node.name, value, scope)
		} else {
			updateArray(node, value, scope)
		}
	}
	const updateName = (name, value, scopes) => {
		for (let i = scopes.length - 1; i >= 0; i--) {
			if (name in scopes[i]) {
				scopes[i][name] = value
			}
		}
	}

	const updateArray = (node, value, scopes) => {
		const objectName = node.object.name
		const object = get(objectName, scopes)
		const key = aval(node.property, scopes)
		object[key] = value
	}

	return {
		update,
		updateName,
		updateArray
	}
}
