import { aval } from '../index'
import { parse } from '../../parse'

describe('aval', () => {
	test('evals typeof', () => {
		expect(aval(parse('typeof 37').program.body[0])).toEqual('number')
		expect(aval(parse('typeof 3.14').program.body[0])).toEqual('number')
		expect(aval(parse('typeof 42').program.body[0])).toEqual('number')
		expect(aval(parse('typeof Math.LN2').program.body[0])).toEqual('number')
		expect(aval(parse('typeof Infinity').program.body[0])).toEqual('number')
		expect(aval(parse('typeof NaN').program.body[0])).toEqual('number')
		expect(aval(parse('typeof Number(1)').program.body[0])).toEqual('number')

		expect(aval(parse("typeof ''").program.body[0])).toEqual('string')
		expect(aval(parse("typeof 'bla'").program.body[0])).toEqual('string')
		expect(aval(parse("typeof '1'").program.body[0])).toEqual('string')
		expect(aval(parse('typeof typeof 1').program.body[0])).toEqual('string')
		expect(aval(parse("typeof String('abc')").program.body[0])).toEqual(
			'string'
		)

		expect(aval(parse('typeof true').program.body[0])).toEqual('boolean')
		expect(aval(parse('typeof false').program.body[0])).toEqual('boolean')
		expect(aval(parse('typeof Boolean(true)').program.body[0])).toEqual(
			'boolean'
		)

		expect(aval(parse('typeof Symbol()').program.body[0])).toEqual('symbol')
		expect(aval(parse('typeof Symbol("foo")').program.body[0])).toEqual(
			'symbol'
		)
		expect(aval(parse('typeof Symbol.iterator').program.body[0])).toEqual(
			'symbol'
		)

		expect(aval(parse('typeof undefined').program.body[0])).toEqual('undefined')

		expect(aval(parse('typeof undeclaredVariable').program.body[0])).toEqual(
			'undefined'
		)

		expect(aval(parse('typeof { a: 1 }').program.body[0])).toEqual('object')

		expect(aval(parse('typeof [1, 2, 4]').program.body[0])).toEqual('object')

		expect(aval(parse('typeof new Date()').program.body[0])).toEqual('object')

		expect(aval(parse('typeof new Boolean(true)').program.body[0])).toEqual(
			'object'
		)
		expect(aval(parse('typeof new Number(1)').program.body[0])).toEqual(
			'object'
		)
		expect(aval(parse('typeof new String("abc")').program.body[0])).toEqual(
			'object'
		)

		expect(aval(parse('typeof function() {}').program.body[0])).toEqual(
			'function'
		)
		// expect(aval(parse('typeof class C {}').program.body[0])).toEqual('function')
		expect(aval(parse('typeof Math.sin').program.body[0])).toEqual('function')
	})
})
