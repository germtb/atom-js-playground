'use babel'

import { combineReducers } from 'redux'

const reducerCreator = actions => initialState => {
	return (state = initialState, { type, payload }) => {
		const action = actions[type]
		if (action !== null && action !== undefined) {
			return typeof action === 'function' ? action(state, payload) : action
		}
		return state
	}
}

const returnPayload = field => (state, payload) =>
	field ? payload[field] : payload

const visible = reducerCreator({
	SHOW: true,
	HIDE: false
})(true)

const text = reducerCreator({
	SET_TEXT: returnPayload('text')
})('')

export default combineReducers({
	visible,
	text
})
