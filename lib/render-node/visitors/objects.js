'use babel'

const visitorsFactory = () => {
	return {
		ObjectExpression: (node, scopes) => {
			return 'ObjectExpression'
		},
		ObjectProperty: (node, scopes) => {
			return 'ObjectProperty'
		},
		SpreadProperty: (node, scopes) => {
			return 'SpreadProperty'
		},
		MemberExpression: (node, scopes) => {
			return 'MemberExpression'
		},
		ObjectMethod: (node, scopes) => {
			return 'ObjectMethod'
		},
		SpreadElement: (node, scopes) => {
			return 'SpreadElement'
		},
		ArrayExpression: (node, scopes) => {
			return 'ArrayExpression'
		}
	}
}

export default visitorsFactory
