'use babel'

import React from 'react'
import { connect } from 'react-redux'
import { asyncParse } from './aval/parse'
import { asyncAval } from './aval'
import { renderNode } from './node-views'

import { visible, getText } from './selectors'

class JSPlayground extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			parsing: true
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			...(nextProps.text !== this.props.text
				? {
						error: null,
						parsing: true,
						ast: null,
						scope: [{}]
					}
				: {})
		})

		const rootScope = {}
		const scope = [rootScope]

		asyncParse(nextProps.text)
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
				console.error('error: ', error)
				this.setState({
					parsing: false,
					evaluating: false,
					error
				})
			})
	}

	render() {
		const { visible } = this.props
		const { error, evaluating, parsing, scope, ast } = this.state

		if (!visible) {
			return null
		} else if (error) {
			return <div className="js_playground_container">Error</div>
		} else if (parsing) {
			return (
				<div className="js_playground_container">
					Parsing
					<div className="spinner" />
				</div>
			)
		} else if (evaluating) {
			return (
				<div className="js_playground_container">
					Evaluating
					<div className="spinner" />
				</div>
			)
		}

		return (
			<div className="js_playground_container">
				{ast.program.body
					.map(node => renderNode(node, scope))
					// .filter(Boolean)
					.map(node => (
						<button className="js_playground_container__node">{node}</button>
					))}
			</div>
		)
	}
}

export default connect(state => ({
	visible: visible(state),
	text: getText(state)
}))(JSPlayground)
