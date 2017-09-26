'use babel'

export default ({ renderNode }) => (node, scope) => {
	return renderNode(node.expression, scope)
}
