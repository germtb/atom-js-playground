'use babel'

import React from 'react'

const visitorsFactory = ({ aval, get }) => {
	return {
		JSXElement: (node, scopes) => {
			const name = aval(node.openingElement.name)
			const attributes = node.openingElement.attributes.reduce(
				(acc, attribute) => {
					const { key, value } = aval(attribute, scopes)
					acc[key] = value
					return acc
				},
				{}
			)
			const children = node.children.map(node => aval(node, scopes))

			const element = React.createElement(name, attributes, children)

			return element
		},
		JSXText: (node, scopes) => {
			return node.value
		},
		JSXExpressionContainer: (node, scopes) => {
			return aval(node.expression, scopes)
		},
		JSXIdentifier: (node, scopes) => {
			if (node.name[0].toLowerCase() === node.name[0]) {
				return node.name
			}

			return get(node.name, scopes)
		},
		JSXAttribute: (node, scopes) => {
			return {
				key: node.name.name,
				value: aval(node.value, scopes)
			}
		}
	}
}

export default visitorsFactory
