'use babel'

const visitorsFactory = ({ aval, update, get, createContinueBreakScope }) => {
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
			} else if (operator === '+') {
				return Number(aval(node.argument, scopes))
			} else if (operator === '~') {
				return ~aval(node.argument, scopes)
			} else if (operator === '-') {
				return -Number(aval(node.argument, scopes))
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
			const blockScope = [...scopes, createContinueBreakScope()]
			aval(node.init, blockScope)
			while (aval(node.test, blockScope)) {
				aval(node.body, blockScope)
				if (get('__shouldBreak', blockScope)) {
					break
				}

				aval(node.update, blockScope)
			}
		},
		ForOfStatement: (node, scopes) => {
			const blockScope = [...scopes, createContinueBreakScope()]

			aval(node.left, blockScope)
			const left = node.left.declarations[0].id
			const right = aval(node.right, blockScope)

			for (const value of right) {
				update(left, value, blockScope)
				if (get('__shouldBreak', blockScope)) {
					break
				}

				aval(node.body, blockScope)
			}
		},
		ForInStatement: (node, scopes) => {
			const blockScope = [...scopes, createContinueBreakScope()]
			aval(node.left, blockScope)
			const left = node.left.declarations[0].id
			const right = aval(node.right, blockScope)

			for (const value in right) {
				update(left, value, blockScope)
				if (get('__shouldBreak', blockScope)) {
					break
				}

				aval(node.body, blockScope)
			}
		},
		WhileStatement: (node, scopes) => {
			const blockScope = [...scopes, createContinueBreakScope()]
			while (aval(node.test, blockScope)) {
				aval(node.body, blockScope)
				if (get('__shouldBreak', blockScope)) {
					break
				}
			}
		},
		ContinueStatement: (node, scopes) => {
			get('__continueCallback', scopes)()
		},
		BreakStatement: (node, scopes) => {
			get('__breakCallback', scopes)()
		}
	}
}

export default visitorsFactory
