'use babel'

export default ({ aval, get, createFunction }) => {
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

		if (classDefinition.__proto.constructor) {
			classDefinition.__proto.constructor(node.arguments, [...scopes, instance])
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

		const __proto = node.body.body.reduce((acc, node) => {
			if (node.kind === 'constructor') {
				acc.constructor = createFunction(node, scopes)
			}
			acc[node.key.name] = createFunction(node, scopes)
			return acc
		}, {})

		Object.defineProperty(obj, '__proto', {
			enumerable: true,
			writable: false,
			value: __proto
		})

		return obj
	}

	return {
		createClass,
		createInstance
	}
}
