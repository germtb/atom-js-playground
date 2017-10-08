import { aval } from '../index'
import { parse } from '../../parse'

describe('aval', () => {
	describe('jsx', () => {
		test('evals jsx declaration', () => {
			const expression = '<div className="hello"/>'
			const ast = parse(expression)
			const node = ast.program.body[0]
			const element = aval(node)
			expect(element.type).toEqual('div')
			expect(element.props).toEqual({
				className: 'hello',
				children: []
			})
		})

		test('evals jsx declaration with text children', () => {
			const expression = "<div className='hello'>SOMETHING</ div>"

			const ast = parse(expression)
			const node = ast.program.body[0]
			const element = aval(node)
			expect(element.type).toEqual('div')
			expect(element.props).toEqual({
				className: 'hello',
				children: ['SOMETHING']
			})
		})

		test('evals jsx declaration with number children', () => {
			const expression = "<div className='hello'>{1234}</ div>"

			const ast = parse(expression)
			const node = ast.program.body[0]
			const element = aval(node)
			expect(element.type).toEqual('div')
			expect(element.props).toEqual({
				className: 'hello',
				children: [1234]
			})
		})
	})
})
