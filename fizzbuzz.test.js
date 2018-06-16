const fizzbuzz = require("./fizzbuzz")

describe('Fizzbuzz',()=>{


    it('return "n" if can not be div by 3 or 5 ',()=>{
        expect(fizzbuzz(1)).toEqual('1')
    })

    it('return "fizz" if can not be div by 3',()=>{
        expect(fizzbuzz(3)).toEqual('fizz')
        expect(fizzbuzz(6)).toEqual('fizz')
        expect(fizzbuzz(9)).toEqual('fizz')
    })

    it('return "fizz" if can not be div by 5',()=>{
        expect(fizzbuzz(5)).toEqual('buzz')
        expect(fizzbuzz(10)).toEqual('buzz')
    })

    it('return "fizz" if can not be div by 15',()=>{
        expect(fizzbuzz(15)).toEqual('fizzbuzz')
    })


})


