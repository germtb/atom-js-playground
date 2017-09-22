const visitorsFactory = dependencies => {
	const {
		aval,
		add,
		get,
		update,
		updateName,
		updateArray,
		createArrowFunction,
		createFunctionExpression,
		createFunction
	} = dependencies
	return {
		ClassExpression: (node, scopes) => {
			console.info('ClassExpression not supported yet')
		},
		NewExpression: (node, scopes) => {
			console.info('NewExpression not supported yet')
			// return scopes[node.callee.name].constructor(node.arguments, scopes)
		}
	}
}

export default visitorsFactory
