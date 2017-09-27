'use babel'

const visitorsFactory = ({ aval, updateName }) => {
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
			const blockScope = [...scopes, {}]
			aval(node.left, blockScope)
			const name = node.left.declarations[0].id.name
			const right = aval(node.right, blockScope)

			for (const value of right) {
				updateName(name, value, blockScope)
				aval(node.body, blockScope)
			}
		},
		ForInStatement: (node, scopes) => {
			const blockScope = [...scopes, {}]
			aval(node.left, blockScope)
			const name = node.left.declarations[0].id.name
			const right = aval(node.right, blockScope)

			for (const value in right) {
				updateName(name, value, blockScope)
				aval(node.body, blockScope)
			}
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
