import { GetStaticProps } from 'next'
import Head from 'next/head';
import Image from 'next/image'
import Link from 'next/link'
import { useKeenSlider } from 'keen-slider/react'
import Stripe from 'stripe'
import { Handbag } from '@phosphor-icons/react'

import { 
  HomeContainer, Product, ButtonAddProductToTheCard, ProductInfo
} from '../styles/pages/home'
import 'keen-slider/keen-slider.min.css'

import { stripe } from '../libs/strip'
import { ContextProductProps } from '../contexts/CartContext';
import { formatPrice } from '../libs/formatPrice';

interface HomeProps {
  products: ContextProductProps[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })

  return (
    <>
      <Head>
        <title>Home Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => {
          return (
            <Product className="keen-slider__slide" key={product.id}>
              <Image src={product.imageUrl} alt="" width={520} height={480} />

              <footer>
                <ProductInfo>
                  <strong>{product.name}</strong>
                  <span>{formatPrice(product.price)}</span>
                </ProductInfo>

                <Link href={`/product/${product.id}`} prefetch={false}>
                  <ButtonAddProductToTheCard>
                    <Handbag width={32} height={32} color='#e1e1e6' />
                  </ButtonAddProductToTheCard>
                </Link>
              </footer>
            </Product>
          );
        })}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  }
}
