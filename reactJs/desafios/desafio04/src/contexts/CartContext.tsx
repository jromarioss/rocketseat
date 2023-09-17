import { createContext, ReactNode, useState } from 'react'

export interface ContextProductProps {
  id: string
  name: string
  description: string
  imageUrl: string
  price: number
  priceId: string
}

interface CartContextProps {
  cartItems: ContextProductProps[]
  totalToPay: number
  addItemOnTheCart: (product: ContextProductProps) => void
  deleteItemOnTheCart: (product: ContextProductProps) => void
  productToBuy: (product: ContextProductProps) => boolean
}

interface CartContextProviderProps {
  children: ReactNode
}

export const CartContext = createContext<CartContextProps>({} as CartContextProps)

export default function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartItems, setCartItems] = useState<ContextProductProps[]>([])
  
  const totalToPay = cartItems.reduce((total, product) => {
    return (total += product.price)
  }, 0)
  
  function addItemOnTheCart(product: ContextProductProps) {
    setCartItems(state => [...state, product])
  }

  function deleteItemOnTheCart(product: ContextProductProps) {
    const produtToDelete = cartItems.filter(item => item.id !== product.id)
    setCartItems(produtToDelete)
  }

  function productToBuy(product: ContextProductProps) {
    return cartItems.some(item => item.id === product.id)
  }

  return (
    <CartContext.Provider value={{
      cartItems, totalToPay, addItemOnTheCart, deleteItemOnTheCart, productToBuy
    }}>
      {children}
    </CartContext.Provider>
  )
}
