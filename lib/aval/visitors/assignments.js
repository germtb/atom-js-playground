'use babel'

const visitorsFactory = ({ aval, get, update }) => {
	return {
		UpdateExpression: (node, scopes) => {
			const operator = node.operator
			const oldValue = get(node.argument.name, scopes)
			let newValue

			if (operator === '++') {
				newValue = oldValue + 1
			} else if (operator === '--') {
				newValue = oldValue - 1
			} else {
				throw `UpdateExpression ${operator} not implemented`
			}

			update(node.argument, newValue, scopes)
			return node.prefix ? newValue : oldValue
		},
		AssignmentExpression: (node, scopes) => {
			const operator = node.operator
			const name = node.left.name
			const oldValue = get(name, scopes)
			const delta = aval(node.right, scopes)

			if (operator === '+=') {
				const newValue = oldValue + delta
				update(node.left, newValue, scopes)
				return newValue
			} else if (operator === '-=') {
				const newValue = oldValue - delta
				update(node.left, newValue, scopes)
				return newValue
			} else if (operator === '*=') {
				const newValue = oldValue * delta
				update(node.left, newValue, scopes)
				return newValue
			} else if (operator === '/=') {
				const newValue = oldValue / delta
				update(node.left, newValue, scopes)
				return newValue
			} else if (operator === '=') {
				update(node.left, delta, scopes)
				return
			}

			throw `AssignmentExpression ${operator} not implemented`
		}
	}
}

export default visitorsFactory
