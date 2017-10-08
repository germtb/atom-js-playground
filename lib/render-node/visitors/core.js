'use babel'
import React from 'react'

const visitorsFactory = ({ renderNode }) => {
	return {
		File: (node, scopes) => {
			return renderNode(node.program, scopes)
		},
		Program: (node, scopes) => {
			return (
				<div>
					{node.body.map((node, index) => (
						<div key={index}>{renderNode(node, scopes)}</div>
					))}
				</div>
			)
		},
		Identifier: (node, scopes) => {
			return 'Identifier'
		},
		ExpressionStatement: (node, scopes) => {
			return renderNode(node.expression, scopes)
		},
		SequenceExpression: (node, scopes) => {
			return 'SequenceExpression'
		},
		VariableDeclarator: (node, scopes) => {
			return 'VariableDeclarator'
		}
	}
}

export default visitorsFactory
