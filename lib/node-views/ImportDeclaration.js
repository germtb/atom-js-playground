'use babel'

import React from 'react'

export default dependencies => (node, scope) => {
	const specifiers = node.specifiers
		.map(s => {
			return s.local.name
		})
		.join(', ')
	return (
		<div className="javascript">
			{`import { ${specifiers} } from '${node.source.value}'`}
		</div>
	)
}
