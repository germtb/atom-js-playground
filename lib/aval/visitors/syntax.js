'use babel'

const visitorsFactory = ({ aval }) => {
	return {
		IfStatement: (node, scopes) => {
			const newScope = [...scopes, {}]
			if (aval(node.test, newScope)) {
				aval(node.consequent, newScope)
			} else if (node.alternate) {
				aval(node.alternate, newScope)
			}
		},
		ConditionalExpression: (node, scopes) => {
			return aval(node.test, scopes)
				? aval(node.consequent, scopes)
				: aval(node.alternate, scopes)
		},
		UnaryExpression: (node, scopes) => {
			const operator = node.operator

			if (operator === '!') {
				return !aval(node.argument, scopes)
			} else if (operator === 'typeof') {
				return typeof aval(node.argument, scopes)
			}

			throw `UnaryExpression ${operator} not implemented`
		},
		LogicalExpression: (node, scopes) => {
			const operator = node.operator

			if (operator === '&&') {
				return aval(node.left, scopes) && aval(node.right)
			} else if (operator === '||') {
				return aval(node.left, scopes) || aval(node.right)
			}

			throw `LogicalExpression ${operator} not implemented`
		},
		ForStatement: (node, scopes) => {
			const blockScope = [...scopes, {}]
			aval(node.init, blockScope)
			while (aval(node.test, blockScope)) {
				aval(node.body, blockScope)
				aval(node.update, blockScope)
			}
		},
		ForOfStatement: (node, scopes) => {
			console.info('ForOfStatement not supported yet')
		},
		ForInStatement: (node, scopes) => {
			console.info('ForInStatement not supported yet')
		},
		WhileStatement: (node, scopes) => {
			const blockScope = [...scopes, {}]
			while (aval(node.test, blockScope)) {
				aval(node.body, blockScope)
			}
		}
	}
}

export default visitorsFactory
