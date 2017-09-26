'use babel'

export default ({ aval, get }) => {
	const createArguments = (paramsDefinition, params, scopes) => {
		return paramsDefinition.reduce((acc, param, index) => {
			acc[param.name] = params[index] ? aval(params[index], scopes) : undefined
			return acc
		}, {})
	}

	const createInstance = (node, scopes) => {
		const className = node.callee.name
		const classDefinition = get(className, scopes)

		const instance = {}

		Object.defineProperty(instance, '__class', {
			enumerable: false,
			writable: false,
			value: className
		})

		classDefinition.__constructor(node.arguments, scopes, instance)
		return instance
	}

	const createClassMethod = (node, scopes) => {
		return instance => {
			const obj = (params, scopes) => {
				const hydratedParams = createArguments(node.params, params, scopes)
				const functionScope = [...scopes, hydratedParams, instance]
				return aval(node.body, functionScope)
			}

			Object.defineProperty(obj, '__type', {
				enumerable: false,
				writable: false,
				value: 'method'
			})

			return obj
		}
	}

	const createClass = (node, scopes) => {
		const obj = {}

		Object.defineProperty(obj, '__type', {
			enumerable: false,
			writable: false,
			value: 'object'
		})

		Object.defineProperty(obj, '__constructor', {
			enumerable: false,
			writable: false,
			value: (params, scopes, instance) => {
				const methods = aval(node.body, scopes)
				return methods(instance)
			}
		})

		return obj
	}

	return {
		createClass,
		createClassMethod,
		createInstance
	}
}
