'use babel'

import React from 'react'
import { connect } from 'react-redux'
import Highlight from 'react-highlight'
import { asyncParse } from './aval/parse'
import { asyncAval } from './aval'

import { visible, getText } from './selectors'

class ReactPlayground extends React.PureComponent {
	constructor(props) {
		super(props)
		this.update = this.update.bind(this)
		this.state = {
			parsing: true
		}
	}

	// shouldComponentUpdate(nextProps, nextState) {
	// 	return true
	// }

	update() {
		if (!this.props.text || this.props.text === '') {
			return
		}

		this.setState({
			error: null,
			parsing: true
		})

		const scope = [{}]

		asyncParse(this.props.text)
			.then(ast => {
				this.setState({
					parsing: false,
					evaluating: true,
					ast
				})

				return asyncAval(ast, scope)
			})
			.then(() => {
				this.setState({
					evaluating: false,
					scope
				})
			})
			.catch(error => {
				console.info('error: ', error)
				this.setState({
					parsing: false,
					evaluating: false,
					error
				})
			})
	}

	componentWillMount() {
		this.update()
	}

	componentWillReceiveProps() {
		this.update()
	}

	render() {
		const { visible } = this.props
		const { error, evaluating, parsing, scope, ast } = this.state

		if (!visible) {
			return null
		} else if (error) {
			return (
				<div className="react_playground_container">
					{JSON.stringify(error, null, 2)}
				</div>
			)
		} else if (parsing) {
			return (
				<div className="react_playground_container">
					Parsing
					<div className="spinner" />
				</div>
			)
		} else if (evaluating) {
			return (
				<div className="react_playground_container">
					Evaluating
					<div className="spinner" />
				</div>
			)
		}

		return (
			<div className="react_playground_container">
				{ast.program.body
					.map(node => {
						return render(node, scope)
					})
					// .filter(Boolean)
					.map(node => (
						<button className="react_playground_container__node">{node}</button>
					))}
			</div>
		)
	}
}

const render = (node, scope) => {
	if (nodeRenderer[node.type]) {
		return nodeRenderer[node.type](node, scope)
	}
	return null
}

const nodeRenderer = {
	VariableDeclaration: (node, scope) => {
		const name = node.declarations[0].id.name
		const value = stringify(scope[0][name])
		return (
			<Highlight className="javascript">{`${name}: ${JSON.stringify(
				value,
				null,
				2
			)}`}</Highlight>
		)
	},
	FunctionDeclaration: (node, scope) => {
		const name = node.id.name
		return <Highlight className="javascript">{`${name}: function`}</Highlight>
	},
	ImportDeclaration: (node, scope) => {
		return null
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
	ClassDeclaration: (node, scope) => {
		const name = node.id.name
		return <Highlight className="javascript">{`${name}: "class"`}</Highlight>
	},
	ExportDefaultDeclaration: (node, scope) => {
		// const result = aval(node.declaration, scope)
		// return (
		// 	<Highlight className="javascript">{`export default ${stringify(
		// 		result
		// 	)}`}</Highlight>
		// )
	},
	ExportNamedDeclaration: (node, scope) => {
		if (!node.declaration.declarations) {
			return null
		}
		const name = node.declaration.declarations[0].id.name
		const value = stringify(scope[0][name])
		return (
			<Highlight className="javascript">{`export ${name}: ${JSON.stringify(
				value,
				null,
				2
			)}`}</Highlight>
		)
	},
	ExpressionStatement: (node, scope) => {
		return render(node.expression)
	},
	CallExpression: (node, scope) => {
		// return (
		// 	<Highlight className="javascript">{`${node.callee.name}(${node.arguments
		// 		.map(node => aval(node, scope))
		// 		.map(stringify)
		// 		.join(', ')})`}</Highlight>
		// )
	}
}

const stringify = value => {
	if (value === null || value === undefined) {
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
