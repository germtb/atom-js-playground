import { expect } from 'chai'
import { astEval } from '../astEval'
import { parse } from '../parse'

describe('astEval', () => {
	context('logical operators', () => {
		it('evals &&', () => {
			expect(astEval(parse('true && false').program.body[0])).to.equal(
				true && false
			)
		})

		it('evals ||', () => {
			expect(astEval(parse('true || false').program.body[0])).to.equal(
				true || false
			)
		})

		it('evals !', () => {
			expect(astEval(parse('!false').program.body[0])).to.equal(true)
		})
	})
})
