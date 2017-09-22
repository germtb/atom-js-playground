'use babel'

import visitorsFactory from './visitors'

const add = (name, value, scopes) => {
	scopes[scopes.length - 1][name] = value
}

const get = (name, scopes) => {
	for (let i = scopes.length - 1; i >= 0; i--) {
		if (name in scopes[i]) {
			return scopes[i][name]
		}
	}
}

const createEval = () => {
	const update = (node, value, scope) => {
		if (node.name) {
			updateName(node.name, value, scope)
		} else {
			updateArray(node, value, scope)
		}
	}

	const updateName = (name, value, scopes) => {
		for (let i = scopes.length - 1; i >= 0; i--) {
			if (name in scopes[i]) {
				scopes[i][name] = value
			}
		}
	}

	const updateArray = (node, value, scopes) => {
		const objectName = node.object.name
		const object = get(objectName, scopes)
		const key = aval(node.property, scopes)
		object[key] = value
	}

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
			const obj = {}

			Object.defineProperty(obj, '__type', {
				enumerable: false,
				writable: false,
				value: 'method'
			})

			Object.defineProperty(obj, '__call', {
				enumerable: false,
				writable: false,
				value: (params, scopes) => {
					const hydratedParams = createArguments(node.params, params, scopes)
					const functionScope = [...scopes, hydratedParams, instance]
					return aval(node.body, functionScope)
				}
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
				console.log('methods: ', methods)
				return methods(instance)
			}
		})

		return obj
	}

	const createArrowFunction = (node, scopes) => {
		const body = node.body
		const obj = {}

		Object.defineProperty(obj, '__type', {
			enumerable: false,
			writable: false,
			value: 'arrow'
		})

		Object.defineProperty(obj, '__call', {
			enumerable: false,
			writable: false,
			value: (params, scopes) => {
				const hydratedParams = createArguments(node.params, params, scopes)
				const functionScope = [...scopes, hydratedParams]
				return aval(body, functionScope)
			}
		})

		return obj
	}

	const createFunction = (node, scopes) => {
		const body = node.body
		const obj = {}

		Object.defineProperty(obj, '__type', {
			enumerable: false,
			writable: false,
			value: 'function'
		})

		Object.defineProperty(obj, '__call', {
			enumerable: false,
			writable: false,
			value: (params, scopes) => {
				const hydratedParams = createArguments(node.params, params, scopes)
				const functionScope = [...scopes, hydratedParams]
				return aval(body, functionScope)
			}
		})

		return obj
	}

	const aval = (node, scopes = [{}]) => {
		const type = node.type
		const visitor = visitors[type]

		if (!visitor) {
			throw `${type} is not a visitor`
		}

		const result = visitor(node, scopes)
		return result
	}

	const visitors = visitorsFactory({
		aval,
		update,
		updateName,
		updateArray,
		createArrowFunction,
		createFunctionExpression: createFunction,
		createFunction,
		createClass,
		createClassMethod,
		createInstance,
		add,
		get
	})
	return aval
}

export const aval = createEval()
