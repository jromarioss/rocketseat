import { useCallback, useEffect, useState } from 'react'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { MaterialIcons, AntDesign, FontAwesome } from '@expo/vector-icons'
import { 
  Box, Icon, HStack, Text, VStack, Heading, ScrollView, Center, useToast
} from 'native-base'

import { api } from '@services/api'
import { useAuth } from '@hooks/useAuth'
import { AppError } from '@utils/AppError'
import { formatBRL } from '@utils/formatBRL'
import { NewProductDTO } from '@dtos/NewProductDTO'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { Button } from '@components/Button'
import { UsePhoto } from '@components/UsePhoto'
import { PaymentIcons } from '@components/PaymentIcons'
import { ImagePreviewCarousel } from '@components/ImagePreviewCarousel'
import { MyProduct } from './MyProduct'

interface RouteParams {
  product: string
  edit?: boolean
}


export function PreviewProduct() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const route = useRoute()
  const toast = useToast()
  
  const { user } = useAuth()
  const { product, edit } = route.params as RouteParams
  
  const [isLoadingButton, setIsLoadingButton] = useState(false)
  const [productData, setProductData] = useState<NewProductDTO>({} as NewProductDTO)

  function handleBackToEditProduct() {
    navigation.navigate('editMyAd', { productId: productData.id })
  }

  function loadProductData() {
    setProductData(JSON.parse(product))
  }

  async function handlePublishProduct() {
    try {
      setIsLoadingButton(true)

      const response = await api.post('/products', {
        name: productData.name,
        description: productData.description,
        is_new: productData.is_new,
        price: productData.price,
        accept_trade: productData.accept_trade,
        payment_methods: productData.payment_methods,
      })

      const data = new FormData()
      data.append('product_id', response.data.id)

      productData.product_images.forEach((image) => {
        const fileExtension = image.uri.split('.').pop()
        const userName = user.name.replace(' ', '')

        const photoFile = {
          name: `${userName}.${fileExtension}`,
          uri: image.uri,
          type: `image/${fileExtension}`,
        } as any

        data.append('images', photoFile)
      })

      await api.post('/products/images', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      const title = 'Produto publicado com sucesso.'

      await toast.show({
        title,
        placement: 'top',
        bgColor: 'green.500',
        duration: 3000,
      })

      navigation.navigate('myAd');
    } catch(error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível publicar o produto.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
        duration: 3000,
      })
    } finally {
      setIsLoadingButton(false)
    }
  }

  async function handleEditProduct() {
    try {
      setIsLoadingButton(true)
      await api.put(`/products/${productData.id}`, {
        name: productData.name,
        description: productData.description,
        is_new: productData.is_new,
        price: productData.price,
        accept_trade: productData.accept_trade,
        payment_methods: productData.payment_methods,
      })

      if(productData.product_images_to_delete && productData.product_images_to_delete.length > 0) {
        await api.delete('/products/images', {
          data: {
            productImagesIds: productData.product_images_to_delete
          }
        })
      }

      let isNewTheImage = false
      const data = new FormData()
      data.append('product_id', productData.id)

      productData.product_images.forEach((image) => {
        if(image.uri) {
          isNewTheImage = true
          
          const fileExtension = image.uri.split('.').pop()
          const userName = user.name.replace(' ', '')

          const photoFile = {
            name: `${userName}.${fileExtension}`,
            uri: image.uri,
            type: `image/${fileExtension}`,
          } as any

          data.append('images', photoFile)
        }
      })

      if(isNewTheImage) {
        await api.post('/products/images', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      }
      const title = 'Produto editado com sucesso.'

      await toast.show({
        title,
        placement: 'top',
        bgColor: 'green.500',
        duration: 3000,
      })

      navigation.navigate('myAd');
    } catch(error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível publicar o produto.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
        duration: 3000,
      })
    } finally {
      setIsLoadingButton(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadProductData()
    }, [ product, edit ])
  )

  return (
    <ScrollView backgroundColor='gray.700'>
      <Box safeArea backgroundColor='blue-light'>
        <Center>
          <Heading mt={9} fontSize={16} color='gray.700'>
            Pré visualização do anúncio
          </Heading>
          <Text color='gray.700' mb={4}>
            É assim que seu produto vai aparecer!
          </Text>
        </Center>
      </Box>
      
     <ImagePreviewCarousel
      images={productData.product_images}
     />

      <Box w='100%' px={6} mt={5}>
        <HStack alignItems='center'>
          <UsePhoto
            source={{uri: `${api.defaults.baseURL}/images/${productData.user?.avatar}`}}
            alt='Imagem do usuário'
            size={10}
          />

          <Text ml='4' color='gray.100'>
            {productData.user?.name}
          </Text>
        </HStack>

        <VStack mt={6}>
          <Box
            w='43' mb={1} alignItems='center'
            rounded='2xl' backgroundColor='gray.500'
          >
            <Text color='gray.200' fontSize={10} fontFamily='heading'>
              {productData.is_new ? 'NOVO': 'USADO'}
            </Text>
          </Box>

          <HStack alignItems='center' justifyContent='space-between'>
            <Heading w={200} numberOfLines={1}>
              {productData.name}
            </Heading>

            <HStack alignItems='center'>
              <Text 
                alignItems='flex-end' ml={1} color='blue-light' fontFamily='heading' fontSize={20}
              >
                {formatBRL(productData.price)}
              </Text>
            </HStack>
          </HStack>

          <Text mt={2} color='gray.200'>
            {productData.description}
          </Text>

          <HStack mt={4}>
            <Text color='gray.100' fontFamily='heading'>
              Aceita troca?
            </Text>

            <Text ml={2} color='gray.200'>
              {productData.accept_trade ? 'Sim' : 'Não'}
            </Text>
          </HStack>

          <VStack mt={1}>
            <Text color='gray.100' fontFamily='heading'>
              Meio de Pagamento:
            </Text>

            {productData.payment_methods?.map((item) => (
              <PaymentIcons key={item} name={item} id={item} />
            ))}
          </VStack>

          <HStack alignItems='center' justifyContent='space-between' mt={46} mb={8}>
            <HStack alignItems='center'>
              <Text alignItems='flex-end' ml={1} color='blue' fontFamily='heading' fontSize={24}>
                {formatBRL(productData.price)}
              </Text>
            </HStack>

            <Button 
              title='Entrar em contato' w={170} 
              leftIcon={
                <Icon 
                  as={FontAwesome} name='whatsapp'
                />
              }
            />
          </HStack>

          <HStack mt={10} mb={10} justifyContent='space-between' alignItems='center'>
            <Button 
              onPress={handleBackToEditProduct} 
              title='Voltar e editar'
              variant='outline' w={150}
              leftIcon={
                <Icon 
                  as={MaterialIcons} name='arrow-back'
                  size={4} color='gray.100'
                />
              }
            />

            <Button 
              onPress={!edit ? handlePublishProduct : handleEditProduct}
              isLoading={isLoadingButton}
              title='Publicar' w={150}
              leftIcon={
                <Icon 
                  as={AntDesign} name='tago'
                  size={4} color='gray.700'
                />
              }
            />
          </HStack>
        </VStack>
      </Box>
    </ScrollView>
  )
}
