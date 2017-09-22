import { expect } from 'chai'
import { aval } from '../aval'
import { parse } from '../parse'

describe('aval', () => {
	context('logical operators', () => {
		it('evals &&', () => {
			expect(aval(parse('true && false').program.body[0])).to.equal(
				true && false
			)
		})

		it('evals ||', () => {
			expect(aval(parse('true || false').program.body[0])).to.equal(
				true || false
			)
		})

		it('evals !', () => {
			expect(aval(parse('!false').program.body[0])).to.equal(true)
		})
	})
})
