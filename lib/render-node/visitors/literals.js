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
			return 'TemplateLiteral'
		},
		TemplateElement: (node, scopes) => {
			return 'TemplateElement'
		},
		NullLiteral: (node, scopes) => {
			return 'NullLiteral'
		},
		RegExpLiteral: (node, scopes) => {
			return 'RegExpLiteral'
		}
	}
}

export default visitorsFactory
