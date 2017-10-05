'use babel'

export default ({ renderNode }) => (node, scopes) => {
	return renderNode(node.program, scopes)
}
