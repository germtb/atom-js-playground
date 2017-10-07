'use babel'

import visitorsFactory from './visitors'
import updateFactory from './update'
import createFunctionFactory from './createFunction'
import createClassFactory from './createClass'
import {
	get,
	add,
	getThis,
	createFunctionScope,
	createBlockScope,
	createContinueBreakScope
} from './scopes'
import { STACK_CALL_LIMIT } from '../constants'

const createEval = () => {
	const avalWithGlobal = (node, scopes = []) => {
		return aval(node, [{ name: 'miniglobal' }, ...scopes])
	}

	const aval = (node, scopes) => {
		if (typeof node === 'string') {
			return node
		}

		const type = node.type
		const visitor = visitors[type]

		if (!visitor) {
			throw `${type} is not a visitor`
		}

		try {
			return visitor(node, scopes)
		} catch (error) {
			return error
		}
	}

	const { update, updateName } = updateFactory({ aval, get })
	const { createFunction, createArrowFunction } = createFunctionFactory({
		aval,
		createFunctionScope,
		getThis
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
		createArrowFunction,
		createFunctionScope,
		createBlockScope,
		createContinueBreakScope,
		createFunctionExpression: createFunction,
		createFunction,
		createClass,
		createClassMethod,
		createInstance,
		add,
		get,
		getThis
	})

	return avalWithGlobal
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
