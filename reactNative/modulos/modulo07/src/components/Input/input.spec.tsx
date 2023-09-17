import { render, screen } from '@testing-library/react-native'

import { Input } from '@components/Input'

describe('Componente: Input', () => {
  it('should be render without activity indicator if isLoading props is undefined.', () => {
    render(<Input />); // manda o componente dentro do render

    const activityIndicator = screen.queryByTestId('activity-indicator') // pega la o componente pelo id e o query ñ retorna exceção
    expect(activityIndicator).toBeNull(); // ñ aparece se o loading n tiver
  })

  it('should be render without activity indicator if isLoading props is true.', () => {
    render(<Input isLoading />); // manda o componente dentro do render

    const activityIndicator = screen.getByTestId('activity-indicator') // pega la o componente pelo id e o query ñ o get retorna exceção
    expect(activityIndicator).toBeTruthy(); // se está carregando
  })
})