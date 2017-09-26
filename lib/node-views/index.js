'use babel'

import VariableDeclarationFactory from './VariableDeclaration'
import FunctionDeclarationFactory from './FunctionDeclaration'
import ImportDeclarationFactory from './ImportDeclaration'
import ClassDeclarationFactory from './ClassDeclaration'
import ExportDefaultDeclarationFactory from './ExportDefaultDeclaration'
import ExportNamedDeclarationFactory from './ExportNamedDeclaration'
import ExpressionStatementFactory from './ExpressionStatement'
import CallExpressionFactory from './CallExpression'

export const renderNode = (node, scope) => {
	if (renderers[node.type]) {
		return renderers[node.type](node, scope)
	}
	console.info(`Implement node of type ${node.type}`)
	return null
}

const dependencies = {
	renderNode
}

const renderers = {
	VariableDeclaration: VariableDeclarationFactory(dependencies),
	FunctionDeclaration: FunctionDeclarationFactory(dependencies),
	ImportDeclaration: ImportDeclarationFactory(dependencies),
	ClassDeclaration: ClassDeclarationFactory(dependencies),
	ExportDefaultDeclaration: ExportDefaultDeclarationFactory(dependencies),
	ExportNamedDeclaration: ExportNamedDeclarationFactory(dependencies),
	ExpressionStatement: ExpressionStatementFactory(dependencies),
	CallExpression: CallExpressionFactory(dependencies)
}
