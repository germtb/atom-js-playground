import visitorsFactory from './visitors'

const add = (name, value, scopes) => {
	scopes[scopes.length - 1][name] = value
}

const get = (name, scopes) => {
	for (let i = scopes.length - 1; i >= 0; i--) {
		if (name in scopes[i]) {
			return scopes[i][name]
		}
	}
}
const createEval = () => {
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

	const createArguments = (paramsDefinition, params, scopes) => {
		return paramsDefinition.reduce((acc, param, index) => {
			const result = aval(params[index], scopes)
			acc[param.name] = params[index] ? aval(params[index], scopes) : undefined
			return acc
		}, {})
	}

	const createArrowFunction = (node, scopes) => {
		const body = node.body
		const bodyType = body.type
		return {
			call: (params, scopes) => {
				const hydratedParams = createArguments(node.params, params, scopes)
				const functionScope = [...scopes, hydratedParams]
				return aval(body, functionScope)
			}
		}
	}

	const aval = (node, scopes = [{}]) => {
		const type = node.type
		const visitor = visitors[type]

		if (!visitor) {
			throw `${type} is not a visitor`
		}

		const result = visitor(node, scopes)
		return result
	}

	const visitors = visitorsFactory({
		aval,
		update,
		updateName,
		updateArray,
		createArrowFunction,
		createFunctionExpression: createArrowFunction,
		createFunction: createArrowFunction,
		add,
		get
	})
	return aval
}

export const aval = createEval()
