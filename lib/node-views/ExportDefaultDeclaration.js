'use babel'

import React from 'react'

import { aval } from '../aval'
import stringify from './stringify'

export default dependencies => (node, scope) => {
	const result = aval(node.declaration, scope)
	return (
		<div className="javascript">{`export default ${stringify(result)}`}</div>
	)
}
