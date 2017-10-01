'use babel'

const visitorsFactory = ({ aval, get, getThis, update }) => {
	return {
		ThisExpression: (node, scopes) => {
			return getThis(scopes)
		}
	}
}

export default visitorsFactory
