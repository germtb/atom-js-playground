'use babel'

const visitorsFactory = ({ aval, add, createFunction, createClass }) => {
	return {
		VariableDeclaration: (node, scopes) => {
			const declarations = node.declarations
			const declaration = declarations[0]
			const value = aval(declaration, scopes)
			add(declaration.id.name, value, scopes)
		},
		ImportDeclaration: (node, scopes) => {
			console.info('ImportDeclaration not supported yet')
		},
		FunctionDeclaration: (node, scopes) => {
			add(node.id.name, createFunction(node, scopes), scopes)
		},
		ClassDeclaration: (node, scopes) => {
			add(node.id.name, createClass(node, scopes), scopes)
		},
		ExportDefaultDeclaration: (node, scopes) => {
			console.info('ExportDefaultDeclaration not supported yet')
		},
		ExportNamedDeclaration: (node, scopes) => {
			aval(node.declaration, scopes)
			console.info('ExportDefaultDeclaration not supported yet')
		}
	}
}

export default visitorsFactory
