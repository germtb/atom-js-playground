'use babel'

export default () => {
	return {
		UpdateExpression: (node, scopes) => {
			return 'UpdateExpression'
		},
		AssignmentExpression: (node, scopes) => {
			return 'AssignmentExpression'
		}
	}
}
