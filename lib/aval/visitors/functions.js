'use babel'

const visitorsFactory = dependencies => {
	const {
		aval,
		get,
		createArrowFunction,
		createFunctionExpression
	} = dependencies
	return {
		CallExpression: (node, scopes) => {
			const func = get(node.callee.name, scopes)
			if (!func) {
				console.info(`Coudln't find ${node.callee.name} in scopes: ${scopes}`)
			} else {
				return func(node.arguments, scopes)
			}
		},
		BlockStatement: (node, scopes) => {
			const body = node.body
			const newScopes = [...scopes, {}]
			for (const bodyNode of body) {
				aval(bodyNode, newScopes)
				if (get('__shouldReturn', scopes)) {
					return get('__returnValue', scopes)
				}
			}
		},
		ReturnStatement: (node, scopes) => {
			const returnValue = aval(node.argument, scopes)
			get('__returnCallback', scopes)(returnValue)
		},
		ArrowFunctionExpression: (node, scopes) => {
			return createArrowFunction(node, scopes)
		},
		FunctionExpression: (node, scopes) => {
			return createFunctionExpression(node, scopes)
		}
	}
}

export default visitorsFactory
