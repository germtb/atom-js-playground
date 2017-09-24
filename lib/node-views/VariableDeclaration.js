'use babel'

import React from 'react'
import Highlight from 'react-highlight'
import stringify from './stringify'

export default (node, scope) => {
	const name = node.declarations[0].id.name
	const value = stringify(scope[0][name])
	return (
		<Highlight className="javascript">{`${name}: ${JSON.stringify(
			value,
			null,
			2
		)}`}</Highlight>
	)
}
