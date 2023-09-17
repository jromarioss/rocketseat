import { getNextDays } from './getNextDays'

describe("getNextDays", () => {
  it("should be return the next five days", () => {
    const days = getNextDays()
    console.log(days) // para saber oq retorno
  
    expect(days.length).toBe(5) // espero que tenha 5 itens dentro do array
  })
  
  it("teste 2", () => {
    const days = getNextDays()
    console.log(days) // para saber oq retorno
  
    expect(days.length).toBe(5) // espero que tenha 5 itens dentro do array
  })
})
