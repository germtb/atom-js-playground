'use babel'

const playgroundRegex = /playground\s*(.*)/

import { parse } from '../parse'

const visitorsFactory = ({ aval, get }) => {
	return {
		File: (node, scopes) => {
			aval(node.program, scopes)
			scopes[0].mocks = {}
			node.comments.forEach(comment => {
				const match = playgroundRegex.exec(comment.value)
				if (!match) {
					return
				}

				const call = match[1]
				const callAst = parse(call).program.body[0].expression
				const functionName = callAst.callee.name
				const params = callAst.arguments.map(p => aval(p, scopes))
				const functionDefinition = get(functionName, scopes)
				const result = functionDefinition(callAst.arguments, scopes)

				if (!scopes[0].mocks[functionName]) {
					scopes[0].mocks[functionName] = []
				}

				scopes[0].mocks[functionName].push({
					arguments: params,
					result
				})
			})
		},
		Program: (node, scopes) => {
			node.body.forEach(node => aval(node, scopes))
		},
		Identifier: (node, scopes) => {
			return get(node.name, scopes)
		},
		ExpressionStatement: (node, scopes) => {
			return aval(node.expression, scopes)
		},
		SequenceExpression: (node, scopes) => {
			console.info('SequenceExpression not supported yet')
		},
		VariableDeclarator: (node, scopes) => {
			return node.init ? aval(node.init, scopes) : undefined
		}
	}
}

export default visitorsFactory
