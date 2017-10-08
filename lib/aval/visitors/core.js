'use babel'

// import { parse } from '../../parse'
// const playgroundRegex = /playground\s*(.*)/

const visitorsFactory = ({ aval, get }) => {
	return {
		File: (node, scopes) => {
			aval(node.program, scopes)
			// scopes[0].mocks = {}
			// node.comments.forEach(comment => {
			// 	const match = playgroundRegex.exec(comment.value)
			// 	if (!match) {
			// 		return
			// 	}
			//
			// 	const call = match[1]
			// 	const callAst = parse(call).program.body[0].expression
			// 	const functionName = callAst.callee.name
			// 	const params = callAst.arguments.map(p => aval(p, scopes))
			// 	const functionDefinition = get(functionName, scopes)
			//
			// 	if (!functionDefinition) {
			// 		return
			// 	}
			//
			// 	const result = functionDefinition(callAst.arguments, scopes)
			//
			// 	if (!scopes[0].mocks[functionName]) {
			// 		scopes[0].mocks[functionName] = []
			// 	}
			//
			// 	scopes[0].mocks[functionName].push({
			// 		arguments: params,
			// 		result
			// 	})
			// })
		},
		Program: (node, scopes) => {
			node.body.forEach(node => aval(node, scopes))
		},
		EmptyStatement: (node, scopes) => {
			return
		},
		DebuggerStatement: (node, scopes) => {
			return
		},
		// TODO
		WithStatement: (node, scopes) => {
			console.log('node: ', node)
		},
		Identifier: (node, scopes) => {
			return get(node.name, scopes)
		},
		ExpressionStatement: (node, scopes) => {
			return aval(node.expression, scopes)
		},
		// TODO
		SequenceExpression: (node, scopes) => {
			console.log('node: ', node)
		},
		VariableDeclarator: (node, scopes) => {
			return node.init ? aval(node.init, scopes) : undefined
		},
		// TODO
		ThrowStatement: (node, scopes) => {
			console.log('node: ', node)
		},
		// TODO
		TryStatement: (node, scopes) => {
			console.log('node: ', node)
		},
		// TODO
		CatchClause: (node, scopes) => {
			console.log('node: ', node)
		}
	}
}

export default visitorsFactory
