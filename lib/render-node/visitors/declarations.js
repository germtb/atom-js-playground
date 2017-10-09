'use babel'
import React from 'react'

const visitorsFactory = ({ get, aval, reactify }) => {
	const Variable = ({ name, scopes }) => {
		const definition = get(name, scopes)
		const value = reactify(definition)
		return (
			<div>
				{`${name}: `}
				{value}
			</div>
		)
	}

	return {
		VariableDeclaration: (node, scopes) => {
			const name = node.declarations[0].id.name
			return <Variable name={name} scopes={scopes} />
		},
		ImportDeclaration: (node, scopes) => {
			const specifiers = node.specifiers.map(s => {
				const name = s.local.name
				return <Variable name={name} scopes={scopes} />
			})
			return (
				<div>
					{'import {'}
					{specifiers}
					{`} from '${node.source.value}'`}
				</div>
			)
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
			return (
				<div>
					{'export default: '}
					{reactify(result)}
				</div>
			)
		},
		ExportNamedDeclaration: (node, scopes) => {
			if (!node.declaration.declarations) {
				return null
			}
			const name = node.declaration.declarations[0].id.name
			const value = reactify(scopes[0][name])
			return (
				<div>
					{`export ${name}: `}
					{reactify(value)}
				</div>
			)
		}
	}
}

export default visitorsFactory
