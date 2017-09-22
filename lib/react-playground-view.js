'use babel'

import React from 'react'
import { connect } from 'react-redux'
import Highlight from 'react-highlight'
import { parse } from './aval/parse'
import { aval } from './aval'

import { visible, getText } from './selectors'

class ReactPlayground extends React.Component {
	render() {
		const { visible, text } = this.props

		if (!visible) {
			return null
		}

		const scope = [{}]
		const ast = parse(text)

		return (
			<div className="react_playground_container">
				{ast &&
					ast.program.body
						.map(node => {
							const renderer = nodeRenderer[node.type]
							return renderer ? renderer(node, scope) : <div>{node.type}</div>
						})
						.filter(Boolean)
						.map(node => (
							<button className="react_playground_container__node">
								{node}
							</button>
						))}
			</div>
		)
	}
}

const nodeRenderer = {
	VariableDeclaration: (node, scope) => {
		aval(node, scope)
		const name = node.declarations[0].id.name
		const value = stringify(scope[0][name])
		return (
			<div>
				<Highlight className="javascript">{`${name}: ${JSON.stringify(
					value,
					null,
					2
				)}`}</Highlight>
			</div>
		)
	},
	FunctionDeclaration: (node, scope) => {
		aval(node, scope)
		const name = node.id.name
		return (
			<div>
				<Highlight className="javascript">{`${name}: function`}</Highlight>
			</div>
		)
	},
	ImportDeclaration: (node, scope) => {
		return null
		// aval(node, scope)
		// const specifiers = node.specifiers
		// 	.map(s => {
		// 		return s.local.name
		// 	})
		// 	.join(', ')
		// return (
		// 	<div>
		// 		<Highlight className="javascript">
		// 			{`import { ${specifiers} } from '${node.source.value}'`}
		// 		</Highlight>
		// 	</div>
		// )
	},
	ClassDeclaration: () => {
		return null
	},
	ExportDefaultDeclaration: () => {
		return null
	},
	ExportNamedDeclaration: () => {
		return null
	},
	ExpressionStatement: (node, scope) => {
		const expression = node.expression
		const renderer = nodeRenderer[expression.type]
		return renderer ? renderer(expression, scope) : <div>{expression.type}</div>
	},
	CallExpression: (node, scope) => {
		return (
			<div>
				<Highlight className="javascript">{`${node.callee.name}(${node.arguments
					.map(node => aval(node, scope))
					.map(stringify)
					.join(', ')})`}</Highlight>
			</div>
		)
	}
}

const stringify = value => {
	if (!value) {
		return
	}

	if (value.__type === 'arrow') {
		return 'arrow'
	} else if (value.__type === 'function') {
		return 'function'
	} else if (value.__type === 'object') {
		return Object.keys(value).reduce((acc, key) => {
			acc[key] = stringify(value[key])
			return acc
		}, {})
	} else if (value.__type === 'array') {
		return value.map(stringify)
	}

	return value
}

export default connect(state => ({
	visible: visible(state),
	text: getText(state)
}))(ReactPlayground)
