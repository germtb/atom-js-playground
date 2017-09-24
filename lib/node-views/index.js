'use babel'

import VariableDeclaration from './VariableDeclaration'
import FunctionDeclaration from './FunctionDeclaration'
import ImportDeclaration from './ImportDeclaration'
import ClassDeclaration from './ClassDeclaration'
import ExportDefaultDeclaration from './ExportDefaultDeclaration'
import ExportNamedDeclaration from './ExportNamedDeclaration'
import ExpressionStatement from './ExpressionStatement'
import CallExpression from './CallExpression'

export const renderNode = (node, scope) => {
	if (nodeRenderer[node.type]) {
		return nodeRenderer[node.type](node, scope)
	}
	return null
}

const nodeRenderer = {
	VariableDeclaration,
	FunctionDeclaration,
	ImportDeclaration,
	ClassDeclaration,
	ExportDefaultDeclaration,
	ExportNamedDeclaration,
	ExpressionStatement,
	CallExpression
}
