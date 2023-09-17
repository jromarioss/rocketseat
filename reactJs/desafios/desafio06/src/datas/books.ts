import habitos from '../assets/images/14-habitos-de-desenvolvedores-altamente-produtivos.png'
import book from '../assets/images/Book.png'
import arquiteturaLimpa from '../assets/images/arquitetura-limpa.png'
import codigoLimpo from '../assets/images/codigo-limpo.png'
import domainDriven from '../assets/images/domain-driven-design.png'
import entendendoAlgoritmos from '../assets/images/entendendo-algoritmos.png'
import fragmentosHorro from '../assets/images/fragmentos-do-horror.png'

export interface BookProps {
  id?: number
  title: string
  author: string
  stars?: number
  imageUrl: any
}

export const Books: BookProps[] = [
  {
    id: 1,
    title: '14 Habitos de Desenvolvedores altamente produtivos',
    author: 'Zeno Rocha',
    stars: 3,
    imageUrl: habitos,
  },
  {
    id: 2,
    title: 'A revolução dos bichos',
    author: 'Robert C.Martins',
    stars: 3,
    imageUrl: book,
  },
  {
    id: 3,
    title: 'Aquitetura Limpa',
    author: '',
    stars: 3,
    imageUrl: arquiteturaLimpa,
  },
  {
    id: 4,
    title: 'Código Limpo',
    author: 'Robert C.Martins',
    stars: 3,
    imageUrl: codigoLimpo,
  },
  {
    id: 5,
    title: 'Domain Driven',
    author: 'Eric Evans',
    stars: 3,
    imageUrl: domainDriven,
  },
  {
    id: 6,
    title: 'Entendendo Algoritmos',
    author: 'Aditya Y.Bhargava',
    stars: 2,
    imageUrl: entendendoAlgoritmos,
  },
  {
    id: 7,
    title: 'Fragmentos do Horror',
    author: 'Sei la o nome',
    stars: 5,
    imageUrl: fragmentosHorro,
  },
]
