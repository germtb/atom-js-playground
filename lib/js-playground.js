'use babel'

import { CompositeDisposable } from 'atom'
import { createStore } from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import path from 'path'

import JSPlayground from './JSPlayground'

import reducers from './reducers'
import { visible } from './selectors'

function initReact(store) {
	const reactRoot = document.createElement('div')
	ReactDOM.render(
		<Provider store={store}>
			<JSPlayground />
		</Provider>,
		reactRoot
	)
	atom.workspace.addRightPanel({ item: reactRoot, model: {} })
}

module.exports = {
	subscriptions: null,
	store: createStore(reducers),
	editorSubscription: null,

	activate() {
		atom.commands.dispatch('tree-view:toggle')

		initReact(this.store)
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
		this.onDidChangeActiveTextEditor(atom.workspace.getActiveTextEditor())
	},

	onDidChangeActiveTextEditor(editor) {
		if (!editor) {
			this.store.dispatch({ type: 'SET_TEXT', payload: { text: '' } })
			return
		}

		this.editorSubscription && this.editorSubscription.dispose()
		this.editorSubscription = editor.onDidStopChanging(() => {
			const text = editor.getText()
			this.setText(text, path.dirname(editor.getPath()))
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
			this.store.dispatch({ type: 'SHOW' })
		}
	}
}
