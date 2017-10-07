'use babel'

import React from 'react'

import stringify from './stringify'

export default dependencies => (node, scope) => {
	if (!node.declaration.declarations) {
		return null
	}
	const name = node.declaration.declarations[0].id.name
	const value = stringify(scope[0][name])
	return <div>{`export ${name}: ${JSON.stringify(value, null, 2)}`}</div>
}
