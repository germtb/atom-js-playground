'use babel'

import React from 'react'

import { aval } from '../aval'
import stringify from './stringify'

export default dependencies => (node, scope) => {
	return (
		<div>{`${node.callee.name}(${node.arguments
			.map(node => aval(node, scope))
			.map(stringify)
			.join(', ')})`}</div>
	)
}
