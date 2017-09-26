'use babel'

import React from 'react'
import Highlight from 'react-highlight'
import { aval } from '../aval'
import stringify from './stringify'

export default dependencies => (node, scope) => {
	return (
		<Highlight className="javascript">{`${node.callee.name}(${node.arguments
			.map(node => aval(node, scope))
			.map(stringify)
			.join(', ')})`}</Highlight>
	)
}
