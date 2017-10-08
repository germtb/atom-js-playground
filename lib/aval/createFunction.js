'use babel'

export default ({ aval, createFunctionScope, getThis }) => {
	const createArguments = (paramsDefinition, params, scopes) => {
		return paramsDefinition.reduce((acc, param, index) => {
			if (param.type === 'RestElement') {
				acc[param.argument.name] = params.slice(index).map(p => aval(p, scopes))
			} else if (param.type === 'Identifier') {
				acc[param.name] = params[index]
					? aval(params[index], scopes)
					: undefined
			}
			return acc
		}, {})
	}

	const createArrowFunction = (node, scopes, thisArg) => {
		const body = node.body
		const obj = (params, scopes) => {
			const hydratedParams = createArguments(node.params, params, scopes)
			const functionScope = [
				...scopes,
				createFunctionScope(hydratedParams, thisArg)
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

	const createFunction = (node, scopes, thisArg = undefined) => {
		const body = node.body

		const obj = (params, scopes) => {
			const hydratedParams = createArguments(node.params, params, scopes)
			const functionScope = [
				...scopes,
				createFunctionScope(hydratedParams, thisArg)
			]
			return aval(body, functionScope)
		}

		Object.defineProperty(obj, 'bind', {
			enumerable: false,
			writable: false,
			value: thisArg => {
				return createFunction(node, scopes, thisArg)
			}
		})

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
