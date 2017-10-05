'use babel'

import { get } from '../aval/scopes'

import FileFactory from './visitors/File'
import ProgramFactory from './visitors/Program'
import VariableDeclarationFactory from './VariableDeclaration'
import FunctionDeclarationFactory from './FunctionDeclaration'
import ImportDeclarationFactory from './ImportDeclaration'
import ClassDeclarationFactory from './ClassDeclaration'
import ExportDefaultDeclarationFactory from './ExportDefaultDeclaration'
import ExportNamedDeclarationFactory from './ExportNamedDeclaration'
import ExpressionStatementFactory from './ExpressionStatement'
import CallExpressionFactory from './CallExpression'

export const renderNode = (node, scopes) => {
	if (renderers[node.type]) {
		return renderers[node.type](node, scopes)
	}
	console.info(`Implement node of type ${node.type}`)
	return null
}

const dependencies = {
	renderNode,
	get
}

const renderers = {
	File: FileFactory(dependencies),
	Program: ProgramFactory(dependencies),
	VariableDeclaration: VariableDeclarationFactory(dependencies),
	FunctionDeclaration: FunctionDeclarationFactory(dependencies),
	ImportDeclaration: ImportDeclarationFactory(dependencies),
	ClassDeclaration: ClassDeclarationFactory(dependencies),
	ExportDefaultDeclaration: ExportDefaultDeclarationFactory(dependencies),
	ExportNamedDeclaration: ExportNamedDeclarationFactory(dependencies),
	ExpressionStatement: ExpressionStatementFactory(dependencies),
	CallExpression: CallExpressionFactory(dependencies)
}
