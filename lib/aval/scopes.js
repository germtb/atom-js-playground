'use babel'

export const add = (name, value, scopes) => {
	scopes[scopes.length - 1][name] = value
}

export const get = (name, scopes) => {
	if (name === 'global' || name === 'window') {
		return global
	}

	for (let i = scopes.length - 1; i >= 0; i--) {
		if (name in scopes[i]) {
			return scopes[i][name]
		}
	}
}

export const getThis = scopes => {
	let functionScope
	for (const scope of scopes.reverse()) {
		if (scope.__scopeType === 'function') {
			functionScope = scope
		}
	}

	if (functionScope) {
		return functionScope.__this
	}

	return scopes[0]
}

export const createFunctionScope = (init = {}, thisArg) => {
	const functionScope = { ...init }

	if (thisArg) {
		Object.defineProperty(functionScope, '__this', {
			enumerable: false,
			writable: false,
			value: thisArg
		})
	}

	Object.defineProperty(functionScope, '__scopeType', {
		enumerable: false,
		writable: false,
		value: 'function'
	})

	const returnCallback = value => {
		Object.defineProperty(functionScope, '__shouldReturn', {
			enumerable: false,
			writable: false,
			value: true
		})

		Object.defineProperty(functionScope, '__returnValue', {
			enumerable: false,
			writable: false,
			value
		})
	}

	Object.defineProperty(functionScope, '__returnCallback', {
		enumerable: false,
		writable: false,
		value: returnCallback
	})

	return functionScope
}

export const createBlockScope = (init = {}) => {
	const blockScope = { ...init }
	Object.defineProperty(blockScope, '__scopeType', {
		enumerable: false,
		writable: false,
		value: 'block'
	})

	return blockScope
}

export const createGlobalScope = () => {
	const globalScope = global
	Object.defineProperty(globalScope, '__scopeType', {
		enumerable: false,
		writable: false,
		value: 'global'
	})

	Object.defineProperty(globalScope, '__this', {
		enumerable: false,
		writable: false,
		value: global
	})

	return globalScope
}

export const createContinueBreakScope = (init = {}) => {
	const blockScope = { ...init }
	Object.defineProperty(blockScope, '__scopeType', {
		enumerable: false,
		writable: false,
		value: 'block'
	})

	const returnCallback = value => {
		Object.defineProperty(blockScope, '__shouldContinue', {
			enumerable: false,
			writable: true,
			value: true
		})
	}

	const breakCallback = value => {
		Object.defineProperty(blockScope, '__shouldBreak', {
			enumerable: false,
			writable: false,
			value: true
		})
	}

	Object.defineProperty(blockScope, '__continueCallback', {
		enumerable: false,
		writable: false,
		value: returnCallback
	})

	Object.defineProperty(blockScope, '__breakCallback', {
		enumerable: false,
		writable: false,
		value: breakCallback
	})

	return blockScope
}
