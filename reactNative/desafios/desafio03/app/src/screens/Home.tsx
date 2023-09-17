import { useCallback, useState } from 'react'
import { 
  Box, Center, HStack, ScrollView, Text, VStack, Icon, Pressable, Modal, Checkbox, Switch, useToast 
} from 'native-base'
import { MaterialIcons, AntDesign, Feather } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { ProductDTO } from '@dtos/ProductDTO'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { Cards } from '@components/Cards'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { Loading } from '@components/Loading'
import { HomeHeader } from '@components/HomeHeader'
import { FilterButton } from '@components/FilterButton'

export function Home() {
  const [nameOfProduct, setNameOfProduct] = useState('')
  const [productActiveCount, setProductActiveCount] = useState(0)
  const [productsAd, setProductsAd] = useState<ProductDTO[]>([])
  const [paymentMethods, setPaymentMethods] = useState<string[]>([])
  const [isNew, setIsNew] = useState<boolean | undefined>(undefined)
  
  const [showModal, setShowModal] = useState(false)
  const [selectNew, setSelectNew] = useState(false)
  const [selectOld, setSelectOld] = useState(false)
  const [acceptTrade, setAcceptTrade] = useState(false)
  const [isLoadingProduct, setIsLoadingProduct] = useState(false)

  const toast = useToast()
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  async function fetchListAllProduct() {
    setIsLoadingProduct(true)
    try {
      const { data } = await api.get('/products', {
        params: {
          query: nameOfProduct || undefined,
          is_new: isNew,
          accept_trade: acceptTrade || undefined,
          payment_methods: paymentMethods
        }
      })
      setProductsAd(data)
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
      setIsLoadingProduct(false)
    }
  }

  async function fetchUserProduct() {
    try {
      const { data } = await api.get('/users/products')
      const amounts = data.filter((amount: ProductDTO) => amount.is_active)
      setProductActiveCount(amounts.length)
    }catch(error) {
      throw error
    } finally {
      setIsLoadingProduct(false)
    }
  }

  function handleSelectNew() {
    setSelectNew(true)
    setSelectOld(false)
    setIsNew(true)
  }

  function handleSelectOld() {
    setSelectOld(true)
    setSelectNew(false)
    setIsNew(false)
  }

  function handleApplyFilter() {
    setShowModal(false)
  }

  function handleResetFilter() {
    setAcceptTrade(false)
    setIsNew(undefined)
    setSelectOld(false)
    setSelectNew(false)
    setPaymentMethods([])
  }

  function handleGoToAnnouncement() {
    navigation.navigate('myAd')
  }

  useFocusEffect(
    useCallback(() => {
      fetchListAllProduct()
    }, [ ,isNew, acceptTrade, paymentMethods ])
  )

  useFocusEffect(
    useCallback(() => {
      fetchUserProduct()
    }, [productActiveCount])
  )

  return(
    <ScrollView flex={1} backgroundColor='gray.700'>
      <Center safeArea mt={3}>
        <Box w='100%' px={6}>
          <Center>
            <HomeHeader />
          </Center>

          <Text mt={8} mb={4} fontSize={14} color='gray.400'>
            Seus produtos anunciados para venda
          </Text>

          <HStack
            backgroundColor='rgba(100, 122, 199, 0.1)' rounded='lg'
            alignItems='center' px={3} py={3}
          >
            <Icon 
              as={AntDesign} name='tago' size={22} color='blue' mr={2}
            />

            <VStack flex={1}>
              <Text fontFamily='heading' fontSize={20}>
                {productActiveCount === 0 ? '0' : productActiveCount}
              </Text>

              <Text>
                {productActiveCount <= 1 ? 'anúncio ativo' : 'anúncios ativos'}
              </Text>
            </VStack>

            <Pressable onPress={handleGoToAnnouncement}>
              <HStack alignItems='center'>
                <Text fontFamily='heading' color='blue'>
                  Meus anúncios
                </Text>

                <Icon 
                  as={MaterialIcons} name='arrow-forward' 
                  size={4} color='blue'  ml={2}
                />
              </HStack>
            </Pressable>
          </HStack>

          <Text mt={8} mb={4} fontSize={14} color='gray.400'>
            Compre produtos variados
          </Text>

          <Input
            InputRightElement={
              <HStack mr={5}>
                <Pressable onPress={fetchListAllProduct}>
                  <Icon 
                    as={AntDesign} name='search1' size={5} mr={2} color='gray.200'
                  />
                </Pressable>
                <Pressable
                  paddingLeft={2} borderLeftWidth={1} borderLeftColor='gray.400'
                  onPress={() => setShowModal(true)}
                > 
                  <Icon 
                    as={Feather} name='sliders' size={5} mr={0} color='gray.200'
                  />
                </Pressable>
              </HStack>
            }
            alignItems='center' mb={4}
            placeholder='Busca anúncio'
            value={nameOfProduct}
            onChangeText={setNameOfProduct}
          />

          <Box 
            flexDirection='row' flexWrap='wrap' justifyContent='space-between'
          >
            {isLoadingProduct ?
              <Center flex={1} mt={150}>
                <Loading />
              </Center>
              :
              <Box
                flexDirection='row'  flexWrap='wrap' justifyContent='space-between'
              >
                {productsAd.map((item) => (
                  <Cards key={item.id} item={item} />
                ))}
              </Box>
            }
          </Box>
        </Box>

        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content w="95%">
              <Modal.CloseButton />
              <Modal.Body >
                <Text fontFamily='heading' fontSize={20} mb={5}>Filtrar anúncios</Text>
                <Text fontFamily='heading' color='gray.200'>Condição</Text>

                <HStack>
                  <FilterButton onPress={handleSelectNew} selected={selectNew} title='NOVO' />
                  <FilterButton onPress={handleSelectOld} selected={selectOld} title='USADO' />
                </HStack>

                <Text fontFamily='heading' color='gray.200' mt={4}>Aceita Troca?</Text>
                <HStack>
                  <Switch 
                    size='lg' offTrackColor='gray.500' onTrackColor='blue-light'
                    onThumbColor='gray.500' offThumbColor='gray.500'
                    value={acceptTrade}
                    onValueChange={(e) => setAcceptTrade(e)}
                  />
                </HStack>

                <Text fontFamily='heading' color='gray.200' mb={3}>
                  Meios de pagamento aceitos
                </Text>
                
                <Checkbox.Group 
                  onChange={setPaymentMethods} 
                  value={paymentMethods} 
                  defaultValue={paymentMethods}
                >
                  <Checkbox 
                    value='boleto' mb={2} 
                    _checked={{
                      bg: 'blue-light',
                      borderColor: 'blue-light'
                    }}
                    _pressed={{
                      bg: 'blue-light',
                      borderColor: 'blue-light'
                    }}
                  >
                    Boleto
                  </Checkbox>

                  <Checkbox 
                    value='pix' mb={2}
                    _checked={{
                      bg: 'blue-light',
                      borderColor: 'blue-light'
                    }}
                    _pressed={{
                      bg: 'blue-light',
                      borderColor: 'blue-light'
                    }}
                  >
                    Pix
                  </Checkbox>

                  <Checkbox 
                    value='dinheiro' mb={2}
                    _checked={{
                      bg: 'blue-light',
                      borderColor: 'blue-light'
                    }}
                    _pressed={{
                      bg: 'blue-light',
                      borderColor: 'blue-light'
                    }}
                  >
                    Dinheiro
                  </Checkbox>

                  <Checkbox 
                    value='credito' mb={2}
                    _checked={{
                      bg: 'blue-light',
                      borderColor: 'blue-light'
                    }}
                    _pressed={{
                      bg: 'blue-light',
                      borderColor: 'blue-light'
                    }}
                  >
                    Cartão de Crédito
                  </Checkbox>

                  <Checkbox 
                    value='deposito'
                    _checked={{
                      bg: 'blue-light',
                      borderColor: 'blue-light'
                    }}
                    _pressed={{
                      bg: 'blue-light',
                      borderColor: 'blue-light'
                    }}
                  >
                    Depósito Bancário
                  </Checkbox>
                </Checkbox.Group>

                <HStack mt={10} justifyContent='space-between' alignItems='center'>
                  <Button 
                    variant='outline' w={150} title='Resetar filtros'
                    onPress={handleResetFilter} 
                  />
                  <Button 
                    w={150} backgroundColor='gray.100' title='Aplicar filtros' 
                    onPress={handleApplyFilter} 
                  />
                </HStack>
              </Modal.Body>
            </Modal.Content>
          </Modal>
      </Center>
    </ScrollView>
  )
}
