'use babel'

import { CompositeDisposable } from 'atom'
import { createStore } from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import ReactPlayground from './react-playground-view'

import reducers from './reducers'
import { visible } from './selectors'

function initReact(store) {
	const reactRoot = document.createElement('div')
	ReactDOM.render(
		<Provider store={store}>
			<ReactPlayground />
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
		initReact(this.store)
		this.subscriptions = new CompositeDisposable()
		this.subscriptions.add(
			atom.commands.add('atom-workspace', {
				'react-playground:toggle': this.toggle.bind(this)
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
			return
		}
		this.onEditorDidStopChanging(editor)
		this.editorSubscription && this.editorSubscription.dispose()
		this.editorSubscription = editor.onDidStopChanging(() =>
			this.onEditorDidStopChanging(editor)
		)
	},

	onEditorDidStopChanging(editor) {
		const text = editor.getText()
		this.store.dispatch({ type: 'SET_TEXT', payload: { text } })
	},

	deactivate() {
		this.disposables = []
		this.subscriptions.dispose()
		this.editorSubscription && this.editorSubscription.dispose()

		this.renameView && this.renameView.destroy()
		this.renameView = null
	},

	serialize() {
		return {}
	},

	toggle() {
		const state = this.store.getState()
		if (visible(state)) {
			this.hide()
		} else {
			this.show()
		}
	},

	show() {
		this.store.dispatch({ type: 'SHOW' })
	},

	hide() {
		this.store.dispatch({ type: 'HIDE' })
		// const editor = atom.workspace.getActiveTextEditor()
		// const view = atom.views.getView(editor)
		// view.focus()
	}
}
