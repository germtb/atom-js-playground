'use babel'

export default ({ aval, get }) => {
	const createArguments = (paramsDefinition, params, scopes) => {
		return paramsDefinition.reduce((acc, param, index) => {
			acc[param.name] = params[index] ? aval(params[index], scopes) : undefined
			return acc
		}, {})
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

	const createInstance = (node, scopes) => {
		const className = node.callee.name
		const classDefinition = get(className, scopes)

		const instance = {}

		Object.defineProperty(instance, '__type', {
			enumerable: false,
			writable: false,
			value: 'instance'
		})

		Object.defineProperty(instance, '__this', {
			enumerable: false,
			writable: false,
			value: instance
		})

		Object.defineProperty(instance, '__class', {
			enumerable: false,
			writable: false,
			value: className
		})

		Object.defineProperty(instance, '__proto', {
			enumerable: false,
			writable: false,
			value: classDefinition.__proto
		})

		if (classDefinition.__constructor) {
			classDefinition.__constructor(node.arguments, [...scopes, instance])
		}
		return instance
	}

	const createClass = (node, scopes) => {
		const obj = {}

		Object.defineProperty(obj, '__type', {
			enumerable: false,
			writable: false,
			value: 'class'
		})

		Object.defineProperty(obj, '__proto', {
			enumerable: false,
			writable: false,
			value: {}
		})

		const __constructor = node.body.body.find(
			({ kind }) => kind === 'constructor'
		)

		if (!__constructor) {
			return obj
		}

		Object.defineProperty(obj, '__constructor', {
			enumerable: false,
			writable: false,
			value: (params, scopes) => {
				const hydratedParams = createArguments(
					__constructor.params,
					node.arguments,
					scopes
				)
				const scopesWithParams = [...scopes, hydratedParams]
				aval(__constructor.body, scopesWithParams)
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
