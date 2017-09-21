import { add, get } from './scopes'

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
	const key = astEval(node.property, scopes)
	object[key] = value
}

const createArguments = (paramsDefinition, params, scopes) => {
	return paramsDefinition.reduce((acc, param, index) => {
		const result = astEval(params[index], scopes)
		acc[param.name] = params[index] ? astEval(params[index], scopes) : undefined
		return acc
	}, {})
}

export const createArrowFunction = (node, scopes) => {
	const body = node.body
	const bodyType = body.type
	return {
		call: (params, scopes) => {
			const hydratedParams = createArguments(node.params, params, scopes)
			const functionScope = [...scopes, hydratedParams]
			return astEval(body, functionScope)
		}
	}
}

export const createFunctionExpression = createArrowFunction
export const createFunction = createArrowFunction
const visitors = {
	VariableDeclaration: (node, scopes) => {
		const declarations = node.declarations
		const declaration = declarations[0]
		add(declaration.id.name, astEval(declaration, scopes), scopes)
	},
	VariableDeclarator: (node, scopes) => {
		return node.init ? astEval(node.init, scopes) : undefined
	},
	Program: (node, scopes) => {
		for (const node of node.body) {
			astEval(node, scopes)
		}
	},
	IfStatement: (node, scopes) => {
		const newScope = [...scopes, {}]
		if (astEval(node.test, newScope)) {
			astEval(node.consequent, newScope)
		} else if (node.alternate) {
			astEval(node.alternate, newScope)
		}
	},
	CallExpression: (node, scopes) => {
		const calle = node.callee
		const func = get(calle.name, scopes)
		if (!func) {
			console.info(`Coudln't find ${calle.name} in scopes: ${scopes}`)
		} else {
			return func.call(node.arguments, scopes)
		}
	},
	BlockStatement: (node, scopes) => {
		const body = node.body
		const newScopes = [...scopes, {}]
		for (const bodyNode of body) {
			if (bodyNode.type === 'ReturnStatement') {
				return astEval(bodyNode, newScopes)
			} else {
				astEval(bodyNode, newScopes)
			}
		}
	},
	ImportDeclaration: (node, scopes) => {
		console.info('ImportDeclaration not supported yet')
	},
	UpdateExpression: (node, scopes) => {
		const operator = node.operator
		const oldValue = get(node.argument.name, scopes)
		let newValue

		if (operator === '++') {
			newValue = oldValue + 1
		} else if (operator === '--') {
			newValue = oldValue - 1
		} else {
			throw `UpdateExpression ${operator} not implemented`
		}

		update(node.argument, newValue, scopes)
		return node.prefix ? newValue : oldValue
	},
	ReturnStatement: (node, scopes) => {
		return astEval(node.argument, scopes)
	},
	NumericLiteral: (node, scopes) => {
		return node.value
	},
	StringLiteral: (node, scopes) => {
		return node.value
	},
	ArrayExpression: (node, scopes) => {
		return node.elements.map(element => astEval(element, scopes))
	},
	ObjectExpression: (node, scopes) => {
		return node.properties.reduce((acc, property) => {
			const { key, value } = astEval(property, scopes)
			acc[key] = value
			return acc
		}, {})
	},
	ObjectProperty: (node, scopes) => {
		return {
			key: node.computed ? astEval(node.key, scopes) : node.key.name,
			value: astEval(node.value, scopes)
		}
	},
	Identifier: (node, scopes) => {
		return get(node.name, scopes)
	},
	ArrowFunctionExpression: (node, scopes) => {
		return createArrowFunction(node, scopes)
	},
	FunctionDeclaration: (node, scopes) => {
		add(node.id.name, createFunction(node, scopes), scopes)
	},
	FunctionExpression: (node, scopes) => {
		return createFunctionExpression(node, scopes)
	},
	BinaryExpression: (node, scopes) => {
		const operator = node.operator
		if (operator === '+') {
			return astEval(node.left, scopes) + astEval(node.right, scopes)
		} else if (operator === '-') {
			return astEval(node.left, scopes) - astEval(node.right, scopes)
		} else if (operator === '*') {
			return astEval(node.left, scopes) * astEval(node.right, scopes)
		} else if (operator === '/') {
			return astEval(node.left, scopes) / astEval(node.right, scopes)
		} else if (operator === '%') {
			return astEval(node.left, scopes) % astEval(node.right, scopes)
		} else if (operator === '==') {
			return astEval(node.left, scopes) == astEval(node.right, scopes)
		} else if (operator === '!=') {
			return astEval(node.left, scopes) != astEval(node.right, scopes)
		} else if (operator === '===') {
			return astEval(node.left, scopes) === astEval(node.right, scopes)
		} else if (operator === '!==') {
			return astEval(node.left, scopes) !== astEval(node.right, scopes)
		} else if (operator === '>') {
			return astEval(node.left, scopes) > astEval(node.right, scopes)
		} else if (operator === '>=') {
			return astEval(node.left, scopes) >= astEval(node.right, scopes)
		} else if (operator === '<') {
			return astEval(node.left, scopes) < astEval(node.right, scopes)
		} else if (operator === '<=') {
			return astEval(node.left, scopes) <= astEval(node.right, scopes)
		}

		throw `BinaryExpression ${operator} not implemented`
	},
	ConditionalExpression: (node, scopes) => {
		return astEval(node.test, scopes)
			? astEval(node.consequent, scopes)
			: astEval(node.alternate, scopes)
	},
	BooleanLiteral: (node, scopes) => {
		return node.value
	},
	UnaryExpression: (node, scopes) => {
		const operator = node.operator

		if (operator === '!') {
			return !astEval(node.argument, scopes)
		} else if (operator === 'typeof') {
			return typeof astEval(node.argument, scopes)
		}

		throw `UnaryExpression ${operator} not implemented`
	},
	LogicalExpression: (node, scopes) => {
		const operator = node.operator

		if (operator === '&&') {
			return astEval(node.left, scopes) && astEval(node.right)
		} else if (operator === '||') {
			return astEval(node.left, scopes) || astEval(node.right)
		}

		throw `LogicalExpression ${operator} not implemented`
	},
	ExpressionStatement: (node, scopes) => {
		return astEval(node.expression, scopes)
	},
	MemberExpression: (node, scopes) => {
		const obj = get(node.object.name, scopes)
		return node.computed
			? obj[astEval(node.property, scopes)]
			: obj[node.property.name]
	},
	AssignmentExpression: (node, scopes) => {
		const operator = node.operator
		const name = node.left.name
		const oldValue = get(name, scopes)
		const delta = astEval(node.right, scopes)

		if (operator === '+=') {
			const newValue = oldValue + delta
			update(node.left, newValue, scopes)
			return newValue
		} else if (operator === '-=') {
			const newValue = oldValue - delta
			update(node.left, newValue, scopes)
			return newValue
		} else if (operator === '*=') {
			const newValue = oldValue * delta
			update(node.left, newValue, scopes)
			return newValue
		} else if (operator === '/=') {
			const newValue = oldValue / delta
			update(node.left, newValue, scopes)
			return newValue
		} else if (operator === '=') {
			update(node.left, delta, scopes)
			return
		}

		throw `AssignmentExpression ${operator} not implemented`
	},
	ClassDeclaration: (node, scopes) => {
		// const newClass = createClass(node, scopes)
		// scopes[node.id.name] = newClass
		console.info('ClassDeclaration not supported yet')
	},
	ClassExpression: (node, scopes) => {
		console.info('ClassExpression not supported yet')
	},
	NewExpression: (node, scopes) => {
		console.info('NewExpression not supported yet')
		// return scopes[node.callee.name].constructor(node.arguments, scopes)
	},
	ExportDefaultDeclaration: (node, scopes) => {
		console.info('ExportDefaultDeclaration not supported yet')
	},
	ExportNamedDeclaration: (node, scopes) => {
		console.info('ExportDefaultDeclaration not supported yet')
	},
	ForStatement: (node, scopes) => {
		const blockScope = [...scopes, {}]
		astEval(node.init, blockScope)
		while (astEval(node.test, blockScope)) {
			astEval(node.body, blockScope)
			astEval(node.update, blockScope)
		}
	},
	ForOfStatement: (node, scopes) => {
		console.info('ForOfStatement not supported yet')
	},
	ForInStatement: (node, scopes) => {
		console.info('ForInStatement not supported yet')
	},
	SequenceExpression: (node, scopes) => {
		console.info('SequenceExpression not supported yet')
	},
	NullLiteral: (node, scopes) => {
		return null
	},
	ObjectMethod: (node, scopes) => {
		console.info('NullLiteral not supported yet')
	}
}

export function astEval(node, scopes = [{}], callback) {
	const type = node.type
	const visitor = visitors[type]

	if (!visitor) {
		throw `${type} is not a visitor`
	}

	const result = visitor(node, scopes, callback)
	return result
}
