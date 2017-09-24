'use babel'

import visitorsFactory from './visitors'
import { STACK_CALL_LIMIT } from '../constants'

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

export const asyncAval = (ast, scopes) =>
	new Promise((resolve, reject) => {
		if (scopes.length > STACK_CALL_LIMIT) {
			reject('Max stack size reached')
		}

		try {
			const result = aval(ast, scopes)
			resolve(result)
		} catch (e) {
			reject(e)
		}
	})
