import { SearchIcon } from 'lucide-react'

import { Container } from './styles'

export function SearchForm() {
  return (
    <Container>
      <label>
        <input placeholder="Buscar livro do autor" />
        <SearchIcon size={20} color="#303F73" />
      </label>
    </Container>
  )
}
