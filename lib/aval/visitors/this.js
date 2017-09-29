'use babel'

const visitorsFactory = ({ aval, get, update }) => {
	return {
		ThisExpression: (node, scopes) => {
			const scope = scopes[scopes.length - 1]
			if (scopes.length === 1) {
				return scope
			} else if (scope.__this) {
				return scope
			}
		}
	}
}

export default visitorsFactory
