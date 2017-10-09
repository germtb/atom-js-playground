'use babel'

import visitorsFactory from './visitors'

import { get } from '../scopes'
import { aval } from '../aval'
import reactify from '../reactify'

export const renderNode = (node, scopes) => {
	if (renderers[node.type]) {
		return renderers[node.type](node, scopes)
	}
	console.info(`Implement node of type ${node.type}`)
	return null
}

const dependencies = {
	renderNode,
	reactify,
	aval,
	get
}

const renderers = {
	...visitorsFactory(dependencies)
}
