'use babel'

const visitorsFactory = ({
	aval,
	createInstance,
	createClassMethod,
	add,
	createClass
}) => {
	return {
		ClassDeclaration: (node, scopes) => {
			add(node.id.name, createClass(node, scopes), scopes)
		},
		ClassBody: (node, scopes) => {
			return node.body.map(bodyNode => aval(bodyNode, scopes))
		},
		ClassMethod: (node, scopes) => {
			const classMethod = createClassMethod(node, scopes)
			return classMethod
		},
		ClassPrivateMethod: (node, scopes) => {
			// TODO
		},
		ClassProperty: (node, scopes) => {
			// TODO
		},
		ClassPrivateProperty: (node, scopes) => {
			// TODO
		},
		MetaProperty: (node, scopes) => {
			// TODO
		},
		ClassExpression: (node, scopes) => {
			// TODO
		},
		NewExpression: (node, scopes) => {
			return createInstance(node, scopes)
		},
		Super: (node, scopes) => {
			// TODO
		}
	}
}

export default visitorsFactory
