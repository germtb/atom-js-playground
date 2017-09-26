import { expect } from 'chai'
import { aval } from '../index'
import { parse } from '../parse'

describe('aval', () => {
	context('comparisson operators', () => {
		it('evals ==', () => {
			expect(aval(parse('0 == 1').program.body[0])).to.equal(0 == 1)
			expect(aval(parse('0 == 0').program.body[0])).to.equal(0 == 0)
		})

		it('evals ===', () => {
			expect(aval(parse('0 === 1').program.body[0])).to.equal(0 === 1)
			expect(aval(parse('0 === 0').program.body[0])).to.equal(0 === 0)
		})

		it('evals ==', () => {
			expect(aval(parse('0 != 1').program.body[0])).to.equal(0 != 1)
			expect(aval(parse('0 != 0').program.body[0])).to.equal(0 != 0)
		})

		it('evals !=', () => {
			expect(aval(parse('0 != 1').program.body[0])).to.equal(0 != 1)
			expect(aval(parse('0 != 0').program.body[0])).to.equal(0 != 0)
		})

		it('evals !==', () => {
			expect(aval(parse('0 !== 1').program.body[0])).to.equal(0 !== 1)
			expect(aval(parse('0 !== 0').program.body[0])).to.equal(0 !== 0)
		})

		it('evals >', () => {
			expect(aval(parse('0 > 1').program.body[0])).to.equal(0 > 1)
			expect(aval(parse('0 > 0').program.body[0])).to.equal(0 > 0)
		})

		it('evals <', () => {
			expect(aval(parse('0 < 1').program.body[0])).to.equal(0 < 1)
			expect(aval(parse('0 < 0').program.body[0])).to.equal(0 < 0)
		})

		it('evals >=', () => {
			expect(aval(parse('0 >= 1').program.body[0])).to.equal(0 >= 1)
			expect(aval(parse('0 >= 0').program.body[0])).to.equal(0 >= 0)
		})

		it('evals <=', () => {
			expect(aval(parse('0 <= 1').program.body[0])).to.equal(0 <= 1)
			expect(aval(parse('0 <= 0').program.body[0])).to.equal(0 <= 0)
		})
	})
})
