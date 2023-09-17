import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'

import { stripe } from '../libs/strip'
import { ImageContainer, SuccessContainer, ImageArea } from '../styles/pages/success'

interface SuccessProps {
  customerName: string
  products: {
    name: string
    images: string
  }[]
}

export default function Success({ customerName, products }: SuccessProps) {
  console.log(products)
  return (
    <>
      <Head>
        <title>Compra efetuada Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>
      
      <SuccessContainer>
        <ImageArea>
          {products.map((product) => (
            <ImageContainer>
              <Image src={product.images[0]} alt={product.name} width={120} height={110} />
            </ImageContainer>
          ))}
        </ImageArea>
        
        <h1>Compra efetuada!</h1>
        
        <p>Uhuul <strong>{customerName}</strong>, sua compra de {products.length}{' '}
        {products.length > 1 ? 'camisetas' : 'camiseta'} já está a caminho da sua casa.</p>

        <Link href="/">
          Voltar ao catálago
        </Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  });

  const customerName = session.customer_details.name
  const products = session.line_items.data.map((product) => {
    return product.price.product as Stripe.Product
  })

  return {
    props: {
      customerName,
      products
    }
  }
}
