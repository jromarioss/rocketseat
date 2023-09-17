import { useCallback, useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import { 
  Box, Center, Heading, ScrollView, Select, Icon, Pressable, HStack, Text, useToast 
} from 'native-base'

import { MaterialIcons } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { ProductDTO } from '@dtos/ProductDTO'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { MyCard } from '@components/MyCard'
import { Loading } from '@components/Loading'

export function MyAd() {
  const [isLoadingMyProducts, setIsLoadingMyProducts] = useState(false)
  const [service, setService] = useState('Todos')
  const [products, setProducts] = useState<ProductDTO[]>([])
  const [productsFiltered, setProductsFiltered] = useState<ProductDTO[]>([])

  const height = Dimensions.get('window').height;
  
  const toast = useToast()
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleCreateAd() {
    navigation.navigate('createAd')
  }

  async function fetchMyProducts() {
    try {
      setIsLoadingMyProducts(true)
      const { data } = await api.get('/users/products')
      setProducts(data)
      setProductsFiltered(data)
    } catch(error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível carregar a lista'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
        duration: 3000,
      })
    } finally {
      setIsLoadingMyProducts(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchMyProducts()
    }, [])
  )

  useEffect(() => {
    if(service.toLowerCase() === 'ativos') {
      const aux = products.filter(product => product.is_active)
      setProductsFiltered(aux)
    } else if(service.toLowerCase() === 'inativos') {
      const aux = products.filter(product => !product.is_active)
      setProductsFiltered(aux)
    } else {
      setProductsFiltered(products)
    }
  }, [service])

  if(isLoadingMyProducts) {
    return (
      <Box h={height} alignItems='center' justifyContent='center'>
        <Loading />
      </Box>
    )
  }

  return(
    <ScrollView bg='gray.700' showsVerticalScrollIndicator={false}>
      <Box safeArea mt={3} px={6}>
        <HStack alignItems='center' mb='10'>
          <Center flex={1}>
            <Heading>
              Meus anúncios
            </Heading>
          </Center>

          <Pressable onPress={handleCreateAd}>
            <Icon 
              as={MaterialIcons} name='add' size={6} color='gray.100'
            />
          </Pressable>
        </HStack>

        <HStack mb='5' alignItems='center' justifyContent='space-between'>
          <Text fontSize={14} color='gray.200'>
            {productsFiltered.length} anúncios
          </Text>

          <Select selectedValue={service} h='34' w='111'
            onValueChange={itemValue => setService(itemValue)}
          >
            <Select.Item label='Todos' value='Todos' />
            <Select.Item label='Ativos' value='Ativos' />
            <Select.Item label='Inativos' value='Inativos' />
          </Select>
        </HStack>
        <Box 
          flexDirection='row' flexWrap='wrap' justifyContent='space-between'
        >
          {productsFiltered.map((item) => (
            <MyCard key={item.id} item={item} />
          ))}
        </Box>
      </Box>
    </ScrollView>
  )
}
