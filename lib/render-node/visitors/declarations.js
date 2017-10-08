'use babel'
import React from 'react'

const visitorsFactory = ({ get, aval, stringify }) => {
	return {
		VariableDeclaration: (node, scopes) => {
			const name = node.declarations[0].id.name
			const definition = get(name, scopes)
			const value = stringify(definition)

			return (
				<div>
					{`${name}: `}
					{value}
				</div>
			)
		},
		ImportDeclaration: (node, scopes) => {
			const specifiers = node.specifiers
				.map(s => {
					return s.local.name
				})
				.join(', ')
			return <div>{`import { ${specifiers} } from '${node.source.value}'`}</div>
		},
		ImportDefaultSpecifier: (node, scopes) => {
			return 'ImportDefaultSpecifier'
		},
		ImportSpecifier: (node, scopes) => {
			return 'ImportSpecifier'
		},
		FunctionDeclaration: (node, scopes) => {
			const name = node.id.name
			return <div>{`${name}: function`}</div>
		},
		ClassDeclaration: (node, scopes) => {
			const name = node.id.name
			return <div>{`${name}: "class"`}</div>
		},
		ExportDefaultDeclaration: (node, scopes) => {
			const result = aval(node.declaration, scopes)
			return <div>{`export default ${stringify(result)}`}</div>
		},
		ExportNamedDeclaration: (node, scopes) => {
			if (!node.declaration.declarations) {
				return null
			}
			const name = node.declaration.declarations[0].id.name
			const value = stringify(scopes[0][name])
			return <div>{`export ${name}: ${JSON.stringify(value, null, 2)}`}</div>
		}
	}
}

export default visitorsFactory
