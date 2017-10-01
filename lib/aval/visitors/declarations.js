'use babel'

import path from 'path'

const visitorsFactory = ({ aval, get, add, createFunction, createClass }) => {
	return {
		VariableDeclaration: (node, scopes) => {
			const declarations = node.declarations
			declarations.forEach(declaration => {
				const value = aval(declaration, scopes)
				add(declaration.id.name, value, scopes)
			})
		},
		ImportDeclaration: (node, scopes) => {
			if (!global.fileModule) {
				return
			}

			const source = node.source.value
			const dir = path.dirname(global.fileModule)
			const importPath = source[0] === '.' ? path.resolve(dir, source) : source
			let importedModule = {}
			try {
				importedModule = require(importPath)
			} catch (e) {
				console.error('Import error: ', e)
				return
			}

			node.specifiers.forEach(node => {
				const importName = aval(node, scopes)
				const givenName = node.local.name
				add(
					givenName,
					importName ? importedModule[importName] : importedModule,
					scopes
				)
			})
		},
		ImportDefaultSpecifier: (node, scopes) => {
			return null
		},
		ImportSpecifier: (node, scopes) => {
			return node.local.name
		},
		FunctionDeclaration: (node, scopes) => {
			add(node.id.name, createFunction(node, scopes), scopes)
		},
		ClassDeclaration: (node, scopes) => {
			add(node.id.name, createClass(node, scopes), scopes)
		},
		ExportDefaultDeclaration: (node, scopes) => {},
		ExportNamedDeclaration: (node, scopes) => {
			aval(node.declaration, scopes)
		}
	}
}

export default visitorsFactory
