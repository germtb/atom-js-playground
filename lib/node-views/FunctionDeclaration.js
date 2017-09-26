'use babel'

import React from 'react'
import Highlight from 'react-highlight'
import stringify from './stringify'

export default (node, scope) => {
	const name = node.id.name
	const mocks = scope[0].mocks
	const functionMocks = mocks[name]
	return (
		<Highlight className="javascript">
			{`${name}: function`}
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
