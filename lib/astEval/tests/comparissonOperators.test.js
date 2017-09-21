import { expect } from 'chai'
import { astEval } from '../astEval'
import { parse } from '../parse'

describe('astEval', () => {
	context('comparisson operators', () => {
		it('evals ==', () => {
			const expression = '0 == 1'
			expect(astEval(parse('0 == 1').program.body[0])).to.equal(0 == 1)
			expect(astEval(parse('0 == 0').program.body[0])).to.equal(0 == 0)
		})

		it('evals ===', () => {
			const expression = '0 === 1'
			expect(astEval(parse('0 === 1').program.body[0])).to.equal(0 === 1)
			expect(astEval(parse('0 === 0').program.body[0])).to.equal(0 === 0)
		})

		it('evals ==', () => {
			const expression = '0 != 1'
			expect(astEval(parse('0 != 1').program.body[0])).to.equal(0 != 1)
			expect(astEval(parse('0 != 0').program.body[0])).to.equal(0 != 0)
		})

		it('evals !=', () => {
			const expression = '0 != 1'
			expect(astEval(parse('0 != 1').program.body[0])).to.equal(0 != 1)
			expect(astEval(parse('0 != 0').program.body[0])).to.equal(0 != 0)
		})

		it('evals !==', () => {
			const expression = '0 !== 1'
			expect(astEval(parse('0 !== 1').program.body[0])).to.equal(0 !== 1)
			expect(astEval(parse('0 !== 0').program.body[0])).to.equal(0 !== 0)
		})

		it('evals >', () => {
			const expression = '0 > 1'
			expect(astEval(parse('0 > 1').program.body[0])).to.equal(0 > 1)
			expect(astEval(parse('0 > 0').program.body[0])).to.equal(0 > 0)
		})

		it('evals <', () => {
			const expression = '0 < 1'
			expect(astEval(parse('0 < 1').program.body[0])).to.equal(0 < 1)
			expect(astEval(parse('0 < 0').program.body[0])).to.equal(0 < 0)
		})

		it('evals >=', () => {
			const expression = '0 >= 1'
			expect(astEval(parse('0 >= 1').program.body[0])).to.equal(0 >= 1)
			expect(astEval(parse('0 >= 0').program.body[0])).to.equal(0 >= 0)
		})

		it('evals <=', () => {
			const expression = '0 <= 1'
			expect(astEval(parse('0 <= 1').program.body[0])).to.equal(0 <= 1)
			expect(astEval(parse('0 <= 0').program.body[0])).to.equal(0 <= 0)
		})
	})
})
