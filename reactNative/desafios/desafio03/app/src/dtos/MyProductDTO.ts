export interface MyProductDTO {
  id?: string
  name: string
  description: string
  price: number
  accept_trade: boolean
  is_active?: boolean
  is_new: boolean
  payment_methods: [{
    key: string
    name: string
  }]
  product_images: [{
    id: string, 
    path: string
  }]
  user: {
    avatar: string
    name: string 
    tel: string
  }
}

/* {
  "id": "d8672f21-09e2-4397-9302-1e392822b12d", 
  "name": "bike 02", 
  "description": "dadawdwadda", 
  "price": 999, 
  "accept_trade": true, 
  "is_active": true, 
  "is_new": true, 
  "payment_methods": [
    {"key": "deposit", "name": "Depósito Bancário"}, 
    {"key": "pix", "name": "Pix"}, {"key": "cash", "name": "Dinheiro"}, 
    {"key": "boleto", "name": "Boleto"}, {"key": "card", "name": "Cartão de Crédito"}
  ], 
  "product_images": [
    {"id": "ad0ad0a7-b93a-4b77-9def-ad34abc4f7a9", "path": "da521bfa68e484e4ffad-Giovanafarias.jpeg"}
  ], 
  "user": {"
  avatar": "723c7cd849ba11ec8879-giovanafarias.jpeg", 
  "name": "Giovana farias", 
  "tel": "15998076725"
  }
} */