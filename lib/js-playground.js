'use babel'

import { CompositeDisposable } from 'atom'
import { createStore } from 'redux'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { dirname } from 'path'

import App from './App'

import reducers from './reducers'
import { visible } from './selectors'

function initReact(store) {
	const reactRoot = document.createElement('div')
	atom.workspace.addRightPanel({ item: reactRoot, model: {} })
	try {
		render(
			<div>
				<link
					rel="stylesheet"
					type="text/css"
					href="../node_modules/highlight.js/styles/atom-one-dark.css"
				/>
				<Provider store={store}>
					<App />
				</Provider>
			</div>,
			reactRoot
		)
	} catch (e) {
		console.error('e: ', e)
	}
}

module.exports = {
	subscriptions: null,
	store: null,
	editorSubscription: null,
	initialised: false,

	activate() {
		this.store = createStore(reducers)

		this.subscriptions = new CompositeDisposable()
		this.subscriptions.add(
			atom.commands.add('atom-workspace', {
				'js-playground:toggle': this.toggle.bind(this)
			})
		)

		this.subscriptions.add(
			atom.workspace.onDidChangeActiveTextEditor(
				this.onDidChangeActiveTextEditor.bind(this)
			)
		)
	},

	initialise() {
		this.initialised = true
		initReact(this.store)
	},

	onDidChangeActiveTextEditor(editor) {
		if (!editor) {
			this.store.dispatch({ type: 'SET_TEXT', payload: { text: '' } })
			return
		}

		this.editorSubscription && this.editorSubscription.dispose()
		this.editorSubscription = editor.onDidStopChanging(() => {
			const text = editor.getText()
			this.setText(text, dirname(editor.getPath()))
		})

		const text = editor.getText()
		global.fileModule = editor.getPath()
		this.setText(text)
	},

	setText(text) {
		this.store.dispatch({
			type: 'SET_TEXT',
			payload: { text }
		})
	},

	deactivate() {
		this.disposables = []
		this.subscriptions.dispose()
		this.editorSubscription && this.editorSubscription.dispose()

		this.renameView && this.renameView.destroy()
		this.renameView = null
	},

	toggle() {
		const state = this.store.getState()
		if (visible(state)) {
			this.store.dispatch({ type: 'HIDE' })
		} else {
			if (!this.initialised) {
				this.initialise()
			}
			this.onDidChangeActiveTextEditor(atom.workspace.getActiveTextEditor())
			this.store.dispatch({ type: 'SHOW' })
		}
	}
}
