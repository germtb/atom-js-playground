'use babel'

const visitorsFactory = ({ aval, get }) => {
	return {
		Program: (node, scopes) => {
			node.body.forEach(node => aval(node, scopes))
		},
		Identifier: (node, scopes) => {
			return get(node.name, scopes)
		},
		ExpressionStatement: (node, scopes) => {
			return aval(node.expression, scopes)
		},
		SequenceExpression: (node, scopes) => {
			console.info('SequenceExpression not supported yet')
		},
		VariableDeclarator: (node, scopes) => {
			return node.init ? aval(node.init, scopes) : undefined
		}
	}
}

export default visitorsFactory
