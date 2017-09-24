'use babel'

import React from 'react'
import Highlight from 'react-highlight'
import { aval } from '../aval'
import stringify from './stringify'

export default (node, scope) => {
	const result = aval(node.declaration, scope)
	return (
		<Highlight className="javascript">{`export default ${stringify(
			result
		)}`}</Highlight>
	)
}
