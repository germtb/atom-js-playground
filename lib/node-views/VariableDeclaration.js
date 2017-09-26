'use babel'

import React from 'react'
import Highlight from 'react-highlight'
import stringify from './stringify'

export default dependencies => (node, scope) => {
	const name = node.declarations[0].id.name
	const definition = scope[0][name]
	const value = stringify(definition)

	let functionMocks
	if (
		definition &&
		(definition.__type === 'arrow' || definition.__type === 'function')
	) {
		const mocks = scope[0].mocks
		functionMocks = mocks[name]
	}

	return (
		<Highlight className="javascript">
			{`${name}: ${JSON.stringify(value, null, 2)}`}
			<div>
				{functionMocks &&
					functionMocks.map(mock => (
						<div className="payground_mock">{`${name}(${mock.arguments
							.map(stringify)
							.join(',')}): ${stringify(mock.result)}`}</div>
					))}
			</div>
		</Highlight>
	)
}
