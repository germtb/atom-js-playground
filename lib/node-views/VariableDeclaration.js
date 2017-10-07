'use babel'

import React from 'react'
import stringify from './stringify'

export default ({ get }) => (node, scopes) => {
	const name = node.declarations[0].id.name
	const definition = get(name, scopes)
	const value = stringify(definition)

	return (
		<div>
			{`${name}: `}
			{value}
		</div>
	)
}
