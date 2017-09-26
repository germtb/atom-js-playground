'use babel'

import visitorsFactory from './visitors'
import updateFactory from './update'
import createFunctionFactory from './createFunction'
import createClassFactory from './createClass'
import { get, add } from './scopes'
import { STACK_CALL_LIMIT } from '../constants'

const createEval = () => {
	const aval = (node, scopes = [{}]) => {
		const type = node.type
		const visitor = visitors[type]

		if (!visitor) {
			throw `${type} is not a visitor`
		}

		const result = visitor(node, scopes)
		return result
	}

	const { update, updateName, updateArray } = updateFactory({ aval, get })
	const { createFunction, createArrowFunction } = createFunctionFactory({
		aval
	})
	const {
		createClass,
		createClassMethod,
		createInstance
	} = createClassFactory({ aval, get })

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
