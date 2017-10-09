'use babel'

import React from 'react'
import { connect } from 'react-redux'

import { asyncAval } from './aval'
import { asyncParse } from './parse'
import { renderNode } from './render-node'
import { visible, getText } from './selectors'
import { initHighlightingOnLoad } from 'highlight.js'

class App extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			parsing: true
		}
	}

	componentDidMount() {
		initHighlightingOnLoad()
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.props.visible
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			...(nextProps.text !== this.props.text
				? {
						error: null,
						parsing: true,
						ast: null,
						scopes: [{}]
					}
				: {})
		})

		const scopes = [{}]

		asyncParse(nextProps.text)
			.then(ast => {
				this.setState({
					parsing: false,
					evaluating: true,
					ast
				})

				const result = asyncAval(ast, scopes)
				return result
			})
			.catch(error => {
				this.setState({
					parsing: false,
					evaluating: false,
					error
				})
			})
			.then(() => {
				this.setState({
					evaluating: false,
					scopes
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
		const { error, evaluating, parsing, scopes, ast } = this.state

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
				<pre>
					<code className="javascript hljs">{renderNode(ast, scopes)}</code>
				</pre>
			</div>
		)
	}
}

export default connect(state => ({
	visible: visible(state),
	text: getText(state)
}))(App)
