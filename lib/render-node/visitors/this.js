'use babel'

const visitorsFactory = () => {
	return {
		ThisExpression: (node, scopes) => {
			return 'ThisExpression'
		}
	}
}

export default visitorsFactory
