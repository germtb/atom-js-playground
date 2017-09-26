'use babel'

export default ({ aval }) => {
	const createArguments = (paramsDefinition, params, scopes) => {
		return paramsDefinition.reduce((acc, param, index) => {
			acc[param.name] = params[index] ? aval(params[index], scopes) : undefined
			return acc
		}, {})
	}

	const createFunctionScope = (hydratedParams, scopes) => {
		const functionScope = { ...hydratedParams }
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

	const createArrowFunction = (node, scopes) => {
		const body = node.body
		const obj = (params, scopes) => {
			const hydratedParams = createArguments(node.params, params, scopes)
			const functionScope = [
				...scopes,
				createFunctionScope(hydratedParams, scopes)
			]
			return aval(body, functionScope)
		}

		Object.defineProperty(obj, '__type', {
			enumerable: false,
			writable: false,
			value: 'arrow'
		})

		return obj
	}

	const createFunction = (node, scopes) => {
		const body = node.body
		const obj = (params, scopes) => {
			const hydratedParams = createArguments(node.params, params, scopes)
			const functionScope = [
				...scopes,
				createFunctionScope(hydratedParams, scopes)
			]
			return aval(body, functionScope)
		}

		Object.defineProperty(obj, '__type', {
			enumerable: false,
			writable: false,
			value: 'function'
		})

		return obj
	}

	return {
		createFunction,
		createArrowFunction
	}
}
