import { useNavigation } from '@react-navigation/native'
import { Image, Text, HStack, Box, Pressable } from 'native-base'

import { api } from '@services/api'
import { formatBRL } from '@utils/formatBRL'
import { ProductDTO } from '@dtos/ProductDTO'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

interface CardsProps {
  item: ProductDTO
}

export function MyCard({ item }: CardsProps) {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleGoToMyProduct(id: string) {
    navigation.navigate('myProduct', { myProductId: id })
  }

  return(
    <Pressable
      w={150} h={140} mb={6}
      onPress={() => handleGoToMyProduct(item.id!)}
    >
      
      {!item.is_active && (
        <Box
          h='100' w='100%' rounded='md'
          position='absolute' bottom={10} zIndex={11} backgroundColor='card-stoped'>
          <Text color='gray.700' fontSize={10} fontFamily='heading' textAlign='center' pt={20} >
            ANÚNCIO DESATIVADO
          </Text>
        </Box>
      )}

      <Box
        position='absolute' top={2} right={1} zIndex={10}
        backgroundColor={ item.is_new ? 'blue' : 'gray.200' }
        rounded='2xl' px={2} py={1}
      >
        <Text color='gray.700' fontSize={10} fontFamily='heading'>
          { item.is_new ? 'NOVO': 'USADO' }
        </Text>
      </Box>
      
      <Image 
        source={{ uri: `${api.defaults.baseURL}/images/${item.product_images[0].path}` }}
        alt='Imagem do produro'
        h={100} rounded='md'
        resizeMode='contain'
      />

      <Text color={!item.is_active ? 'gray.400' : 'gray.300'} numberOfLines={1}>
        {item.name}
      </Text>

      <HStack alignItems='center'>
        <Text color={!item.is_active ? 'gray.400' : 'gray.300'} fontFamily='heading' fontSize={16}>
          {formatBRL(item.price)}
        </Text>
      </HStack>
    </Pressable>
  )
}
