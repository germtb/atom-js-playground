'use babel'

const visitorsFactory = () => {
	return {
		BinaryExpression: (node, scopes) => {
			return 'BinaryExpression'
		}
	}
}

export default visitorsFactory
