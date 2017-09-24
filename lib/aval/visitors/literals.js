'use babel'

const visitorsFactory = ({ aval }) => {
	return {
		NumericLiteral: (node, scopes) => {
			return node.value
		},
		StringLiteral: (node, scopes) => {
			return node.value
		},
		BooleanLiteral: (node, scopes) => {
			return node.value
		},
		TemplateLiteral: (node, scopes) => {
			const quasis = node.quasis.map(node => `${aval(node)}`)
			const expressions = node.expressions.map(node => `${aval(node)}`)

			let result = ''
			for (let i = 0; i < quasis.length - 1; i++) {
				result += quasis[i] + expressions[i]
			}
			result += quasis[quasis.length - 1]

			return result
		},
		TemplateElement: (node, scopes) => {
			return node.value.cooked
		},
		NullLiteral: (node, scopes) => {
			return null
		},
		RegExpLiteral: (node, scopes) => {
			console.info('RegExpLiteral not supported yet')
		}
	}
}

export default visitorsFactory
