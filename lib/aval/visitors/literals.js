'use babel'

const visitorsFactory = dependencies => {
	return {
		NumericLiteral: (node, scopes) => {
			return node.value
		},
		StringLiteral: (node, scopes) => {
			return node.value
		},
		BooleanLiteral: (node, scopes) => {
			return node.value
		},
		NullLiteral: (node, scopes) => {
			return null
		},
		RegExpLiteral: (node, scopes) => {
			console.info('RegExpLiteral not supported yet')
		}
	}
}

export default visitorsFactory
