'use babel'
import React from 'react'

const visitorsFactory = ({ aval, reactify }) => {
	return {
		CallExpression: (node, scopes) => {
			return (
				<div>{`${node.callee.name}(${node.arguments
					.map(node => aval(node, scopes))
					.map(reactify)
					.join(', ')})`}</div>
			)
		},
		BlockStatement: (node, scopes) => {
			return 'BlockStatement'
		},
		ReturnStatement: (node, scopes) => {
			return 'ReturnStatement'
		},
		ArrowFunctionExpression: (node, scopes) => {
			return 'ArrowFunctionExpression'
		},
		FunctionExpression: (node, scopes) => {
			return 'FunctionExpression'
		}
	}
}

export default visitorsFactory
