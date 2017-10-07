'use babel'

import React from 'react'

export default dependencies => (node, scope) => {
	const name = node.id.name
	return <div className="javascript">{`${name}: function`}</div>
}
