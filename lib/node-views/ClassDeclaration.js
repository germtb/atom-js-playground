'use babel'

import React from 'react'
import Highlight from 'react-highlight'

export default dependencies =>  (node, scope) => {
	const name = node.id.name
	return <Highlight className="javascript">{`${name}: "class"`}</Highlight>
}
