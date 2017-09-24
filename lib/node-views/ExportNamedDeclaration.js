'use babel'

import React from 'react'
import Highlight from 'react-highlight'
import stringify from './stringify'

export default (node, scope) => {
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
}
