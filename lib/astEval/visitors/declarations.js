const visitorsFactory = ({ aval, add, createFunction }) => {
	return {
		VariableDeclaration: (node, scopes) => {
			const declarations = node.declarations
			const declaration = declarations[0]
			add(declaration.id.name, aval(declaration, scopes), scopes)
		},
		ImportDeclaration: (node, scopes) => {
			console.info('ImportDeclaration not supported yet')
		},
		FunctionDeclaration: (node, scopes) => {
			add(node.id.name, createFunction(node, scopes), scopes)
		},
		ClassDeclaration: (node, scopes) => {
			console.info('ClassDeclaration not supported yet')
		},
		ExportDefaultDeclaration: (node, scopes) => {
			console.info('ExportDefaultDeclaration not supported yet')
		},
		ExportNamedDeclaration: (node, scopes) => {
			console.info('ExportDefaultDeclaration not supported yet')
		}
	}
}

export default visitorsFactory
