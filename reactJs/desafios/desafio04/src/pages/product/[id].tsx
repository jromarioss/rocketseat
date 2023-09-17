
import Stripe from 'stripe'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next'

import { stripe } from '../../libs/strip'
import { useCart } from '../../hook/useCart'

import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/product'
import { ContextProductProps } from '../../contexts/CartContext'
import { formatPrice } from '../../libs/formatPrice'

interface ProductProps {
  product: ContextProductProps
}

export default function Product({ product }: ProductProps) {
  const { addItemOnTheCart } = useCart()

  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Head>
        <title>{product.name} Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} alt="" width={520} height={480} />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{formatPrice(product.price)}</span>

          <p>{product.description}</p>

          <button onClick={() => addItemOnTheCart(product)}>
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {

  return {
    paths: [
      { params: { id: 'prod_NsKpbBmYZxXVl3'} }
    ],

    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount,
        description: product.description,
        priceId: price.id,
      }
    },
    revalidate: 60 * 60 * 1,
  }
}
