'use babel'

const visitorsFactory = ({ aval, createInstance, createClassMethod }) => {
	return {
		ClassBody: (node, scopes) => {
			return node.body.map(bodyNode => aval(bodyNode, scopes))
		},
		ClassMethod: (node, scopes) => {
			const classMethod = createClassMethod(node, scopes)
			return classMethod
		},
		ClassExpression: (node, scopes) => {
			console.info('ClassExpression not supported yet')
		},
		NewExpression: (node, scopes) => {
			return createInstance(node, scopes)
		},
		// TODO
		Super: (node, scopes) => {
			console.log('node: ', node)
		}
	}
}

export default visitorsFactory
