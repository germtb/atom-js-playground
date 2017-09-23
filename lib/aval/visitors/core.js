'use babel'

const visitorsFactory = ({ aval, get }) => {
	return {
		File: (node, scopes) => {
			aval(node.program, scopes)
		},
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
