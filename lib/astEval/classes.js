export const createClass = (node, scopes) => {
	const body = node.body
	return {
		constructor: (params, scopes) => {
			const hydratedParams = createArguments(node.params, params, scopes)
			const functionScope = Object.assign({}, scopes, hydratedParams)
			return astEval(body, functionScope)
		}
	}
}
