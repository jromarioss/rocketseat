import { HStack, Text, VStack, Icon } from 'native-base'

import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { api } from '@services/api'
import { useAuth } from '@hooks/useAuth'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { Button } from './Button'
import { UsePhoto } from './UsePhoto'

export function HomeHeader() {
  const { user } = useAuth()

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleCreateAd() {
    navigation.navigate('createAd')
  }

  return(
    <HStack w='100%' justifyContent='space-between'>
      <HStack>
        <UsePhoto
          source={{ uri: `${api.defaults.baseURL}/images/${user.avatar}` }}
          alt='Imagem do usuário'
          size={10}
        />

        <VStack w={125} ml={2.5}>
          <Text>
            Bem vindo,
          </Text>
          <Text fontWeight='bold'>
            { user.name }!
          </Text>
        </VStack>
      </HStack>

      <Button
        onPress={handleCreateAd}
        flex={1}
        title='Criar anúncio'
        backgroundColor='gray.100'
        leftIcon={
          <Icon 
            as={MaterialIcons}
            name='add'
            size={4}
          />
        }
      />
    </HStack>
  )
}
