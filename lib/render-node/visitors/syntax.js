'use babel'

const visitorsFactory = () => {
	return {
		IfStatement: (node, scopes) => {
			return 'IfStatement'
		},
		ConditionalExpression: (node, scopes) => {
			return 'ConditionalExpression'
		},
		UnaryExpression: (node, scopes) => {
			return 'UnaryExpression'
		},
		LogicalExpression: (node, scopes) => {
			return 'LogicalExpression'
		},
		ForStatement: (node, scopes) => {
			return 'ForStatement'
		},
		ForOfStatement: (node, scopes) => {
			return 'ForOfStatement'
		},
		ForInStatement: (node, scopes) => {
			return 'ForInStatement'
		},
		WhileStatement: (node, scopes) => {
			return 'WhileStatement'
		},
		ContinueStatement: (node, scopes) => {
			return 'ContinueStatement'
		},
		BreakStatement: (node, scopes) => {
			return 'BreakStatement'
		}
	}
}

export default visitorsFactory
