'use babel'

import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import Highlight from 'react-highlight'
import { parse } from './astEval/parse'
import { astEval } from './astEval/astEval'

import { visible, getText } from './selectors'

class ReactPlayground extends React.Component {
	render() {
		const { visible, text } = this.props

		if (!visible) {
			return null
		}

		const scope = {}
		const ast = parse(text)

		return (
			<div className="react_playground_container">
				{ast &&
					ast.program.body.map(node => {
						const result = astEval(node, scope)
						const renderer = nodeRenderer[node.type]
						return (
							// <button className="react_playground_container__node">
							renderer ? renderer(node, scope, result) : <div>{node.type}</div>
							// </button>
						)
					})}
			</div>
		)
	}
}

const nodeRenderer = {
	VariableDeclaration: (node, scope, result) => {
		const name = node.declarations[0].id.name
		const value = JSON.stringify(scope[name], null, 2)
		return (
			<div>
				<Highlight className="javascript">{`${name} = ${value}`}</Highlight>
			</div>
		)
	}
}

export default connect(state => ({
	visible: visible(state),
	text: getText(state)
}))(ReactPlayground)
