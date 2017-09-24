'use babel'

import React from 'react'
import Highlight from 'react-highlight'

export default (node, scope) => {
	const specifiers = node.specifiers
		.map(s => {
			return s.local.name
		})
		.join(', ')
	return (
		<div>
			<Highlight className="javascript">
				{`import { ${specifiers} } from '${node.source.value}'`}
			</Highlight>
		</div>
	)
}
