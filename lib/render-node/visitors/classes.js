'use babel'

const visitorsFactory = () => {
	return {
		ClassBody: (node, scopes) => {
			return 'ClassBody'
		},
		ClassMethod: (node, scopes) => {
			return 'ClassMethod'
		},
		ClassExpression: (node, scopes) => {
			return 'ClassExpression'
		},
		NewExpression: (node, scopes) => {
			return 'NewExpression'
		}
	}
}

export default visitorsFactory
