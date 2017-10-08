'use babel'

const visitorsFactory = ({ aval }) => {
	return {
		BinaryExpression: (node, scopes) => {
			const operator = node.operator
			if (operator === '+') {
				return aval(node.left, scopes) + aval(node.right, scopes)
			} else if (operator === '-') {
				return aval(node.left, scopes) - aval(node.right, scopes)
			} else if (operator === '*') {
				return aval(node.left, scopes) * aval(node.right, scopes)
			} else if (operator === '/') {
				return aval(node.left, scopes) / aval(node.right, scopes)
			} else if (operator === '%') {
				return aval(node.left, scopes) % aval(node.right, scopes)
			} else if (operator === '**') {
				return aval(node.left, scopes) ** aval(node.right, scopes)
			} else if (operator === '==') {
				return aval(node.left, scopes) == aval(node.right, scopes)
			} else if (operator === '!=') {
				return aval(node.left, scopes) != aval(node.right, scopes)
			} else if (operator === '===') {
				return aval(node.left, scopes) === aval(node.right, scopes)
			} else if (operator === '!==') {
				return aval(node.left, scopes) !== aval(node.right, scopes)
			} else if (operator === '>') {
				return aval(node.left, scopes) > aval(node.right, scopes)
			} else if (operator === '>=') {
				return aval(node.left, scopes) >= aval(node.right, scopes)
			} else if (operator === '<') {
				return aval(node.left, scopes) < aval(node.right, scopes)
			} else if (operator === '<=') {
				return aval(node.left, scopes) <= aval(node.right, scopes)
			} else if (operator === '&') {
				return aval(node.left, scopes) & aval(node.right, scopes)
			} else if (operator === '^') {
				return aval(node.left, scopes) ^ aval(node.right, scopes)
			} else if (operator === '|') {
				return aval(node.left, scopes) | aval(node.right, scopes)
			} else if (operator === '<<') {
				return aval(node.left, scopes) << aval(node.right, scopes)
			} else if (operator === '>>') {
				return aval(node.left, scopes) >> aval(node.right, scopes)
			} else if (operator === '>>>') {
				return aval(node.left, scopes) >>> aval(node.right, scopes)
			} else if (operator === 'in') {
				return aval(node.left, scopes) in aval(node.right, scopes)
			} else if (operator === 'instanceof') {
				return aval(node.left, scopes) instanceof aval(node.right, scopes)
			}

			throw `BinaryExpression ${operator} not implemented`
		}
	}
}

export default visitorsFactory
