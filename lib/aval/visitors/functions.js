'use babel'

const visitorsFactory = ({
	aval,
	get,
	getThis,
	createArrowFunction,
	createFunctionExpression,
	updateName
}) => {
	return {
		CallExpression: (node, scopes) => {
			const func = aval(node.callee, scopes)
			if (!func) {
				console.info(`Coudln't find ${node.callee.name} in scopes: ${scopes}`)
			} else {
				if (!func.__type) {
					const arg0 = node.arguments[0]
						? aval(node.arguments[0], scopes)
						: undefined
					const arg1 = node.arguments[1]
						? aval(node.arguments[1], scopes)
						: undefined
					const arg2 = node.arguments[2]
						? aval(node.arguments[2], scopes)
						: undefined
					const arg3 = node.arguments[3]
						? aval(node.arguments[3], scopes)
						: undefined
					const arg4 = node.arguments[4]
						? aval(node.arguments[4], scopes)
						: undefined

					if (node.arguments.length === 0) {
						return func()
					} else if (node.arguments.length === 1) {
						return func(arg0)
					} else if (node.arguments.length === 2) {
						return func(arg0, arg1)
					} else if (node.arguments.length === 3) {
						return func(arg0, arg1, arg2)
					} else if (node.arguments.length === 4) {
						return func(arg0, arg1, arg2, arg3)
					} else if (node.arguments.length === 5) {
						return func(arg0, arg1, arg2, arg3, arg4)
					}

					throw 'That many arguments are not supported'
				}

				return func(node.arguments, scopes)
			}
		},
		RestElement: (node, scopes) => {
			console.log('node: ', node)
		},
		BlockStatement: (node, scopes) => {
			const body = node.body
			const newScopes = [...scopes, {}]

			for (const bodyNode of body) {
				aval(bodyNode, newScopes)
				if (get('__shouldReturn', scopes)) {
					return get('__returnValue', scopes)
				}

				if (get('__shouldContinue', scopes)) {
					return
				}

				if (get('__shouldBreak', scopes)) {
					return
				}
			}
		},
		ReturnStatement: (node, scopes) => {
			const returnValue = node.argument
				? aval(node.argument, scopes)
				: undefined
			get('__returnCallback', scopes)(returnValue)
		},
		ArrowFunctionExpression: (node, scopes) => {
			const arrow = createArrowFunction(node, scopes, getThis(scopes))
			return arrow
		},
		FunctionExpression: (node, scopes) => {
			return createFunctionExpression(node, scopes)
		},
		// TODO
		YieldExpression: (node, scopes) => {
			console.log('node: ', node)
		},
		// TODO
		AwaitExpression: (node, scopes) => {
			console.log('node: ', node)
		},
		// TODO
		BindExpression: (node, scopes) => {
			console.log('node: ', node)
		}
	}
}

export default visitorsFactory
