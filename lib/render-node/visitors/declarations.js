'use babel'
import React from 'react'

import { TAB, FEATURE_FLAGS } from '../../constants'

const visitorsFactory = ({ get, aval, reactify, renderNode }) => {
	const Variable = ({ name, scopes, tabulation = '' }) => {
		const definition = get(name, scopes)
		const value = reactify(definition, tabulation)
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
			if (!FEATURE_FLAGS.IMPORTS) {
				return null
			}

			return (
				<div>
					{'import {'}
					{node.specifiers.map(node => renderNode(node, scopes))}
					{`} from '${node.source.value}'`}
				</div>
			)
		},
		ImportDefaultSpecifier: (node, scopes) => {
			const name = node.local.name
			const definition = get(name, scopes)
			const value = reactify(definition, TAB)

			return (
				<div>
					{`default as ${name}: `}
					{value}
				</div>
			)
		},
		ImportSpecifier: (node, scopes) => {
			const name = node.local.name
			return <Variable name={name} scopes={scopes} tabulation={TAB} />
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
