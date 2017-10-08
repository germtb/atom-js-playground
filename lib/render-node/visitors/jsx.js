'use babel'

const visitorsFactory = () => {
	return {
		JSXElement: (node, scopes) => {
			return 'JSXElement'
		},
		JSXText: (node, scopes) => {
			return 'JSXText'
		},
		JSXEmptyExpression: (node, scope) => {
			return 'JSXEmptyExpression'
		},
		JSXSpreadAttribute: (node, scopes) => {
			return 'JSXSpreadAttribute'
		},
		JSXExpressionContainer: (node, scopes) => {
			return 'JSXExpressionContainer'
		},
		JSXIdentifier: (node, scopes) => {
			return 'JSXIdentifier'
		},
		JSXAttribute: (node, scopes) => {
			return 'JSXAttribute'
		}
	}
}

export default visitorsFactory
