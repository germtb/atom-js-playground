'use babel'

import visitorsFactory from './visitors'

import { get } from '../scopes'
import { aval } from '../aval'
import stringify from '../stringify'

export const renderNode = (node, scopes) => {
	if (renderers[node.type]) {
		return renderers[node.type](node, scopes)
	}
	console.info(`Implement node of type ${node.type}`)
	return null
}

const dependencies = {
	renderNode,
	stringify,
	aval,
	get
}

const renderers = {
	...visitorsFactory(dependencies)
}
