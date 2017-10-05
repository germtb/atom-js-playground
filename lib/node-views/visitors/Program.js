'use babel'

import React from 'react'

export default ({ renderNode }) => (node, scopes) => {
	return (
		<div>
			{node.body.map((node, index) => (
				<div key={index}>{renderNode(node, scopes)}</div>
			))}
		</div>
	)
}
