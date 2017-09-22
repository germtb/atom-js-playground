import literalsFactory from './literals'
import declarationsFactory from './declarations'
import syntaxFactory from './syntax'

const visitorsFactory = dependencies => {
	const {
		aval,
		get,
		createArrowFunction,
		createFunctionExpression,
		createFunction
	} = dependencies
	return {
		CallExpression: (node, scopes) => {
			const calle = node.callee
			const func = get(calle.name, scopes)
			if (!func) {
				console.info(`Coudln't find ${calle.name} in scopes: ${scopes}`)
			} else {
				return func.call(node.arguments, scopes)
			}
		},
		BlockStatement: (node, scopes) => {
			const body = node.body
			const newScopes = [...scopes, {}]
			for (const bodyNode of body) {
				if (bodyNode.type === 'ReturnStatement') {
					return aval(bodyNode, newScopes)
				} else {
					aval(bodyNode, newScopes)
				}
			}
		},

		ReturnStatement: (node, scopes) => {
			return aval(node.argument, scopes)
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
