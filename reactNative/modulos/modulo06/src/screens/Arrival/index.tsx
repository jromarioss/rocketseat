import { BSON } from 'realm'
import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { X } from 'phosphor-react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { useObject, useRealm } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/Historic'

import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { ButtonIcon } from '../../components/ButtonIcon'

import { Container, Content, Description, Label, LicensePlate, Footer, AsyncMessage } from './styles'
import { getLastSyncTimestamp } from '../../libs/asyncStorage/syncStorage'
import { stopLocationTask } from '../../tasks/backgroundLocationTask'

interface RouteParamsProps {
  id: string
}

export function Arrival() {
  const [dataNotSynced, setDataNotSynced] = useState(false)
  const route = useRoute()
  const { goBack } = useNavigation()
  const { id } = route.params as RouteParamsProps

  const historic = useObject(Historic, new BSON.UUID(id))
  const realm = useRealm()

  const title = historic?.status === 'departure' ? 'Chegada' : 'Detalhes'

  function handleRemoveVehicleUsage() {
    Alert.alert('Cancelar', 'Cancelar a utilização do veículo?',[
      { text: 'Não', style: 'cancel'},
      { text: 'Sim', onPress: () => removeVehicleUsage()},
    ])
  }

  function removeVehicleUsage() {
    realm.write(() => {
      realm.delete(historic)
    })

    goBack()
  }

  async function handleArrivalRegister() {
    try {
      if(!historic) {
        return Alert.alert('Erro', 'Não foi possível obter os dados para registrar a chegada do veículo.')
      }

      await stopLocationTask();

      realm.write(() => {
        historic.status = 'arrival'
        historic.update_at = new Date()
      })

      Alert.alert('Chegada', 'Chegada registrada com sucesso.')
      goBack()
    } catch (error) {
      Alert.alert('Erro', "Não foi possível registar a chegada do veículo.")
      console.log(error)
    }
  }

  useEffect(() => {
    getLastSyncTimestamp()
      .then(lastSync => setDataNotSynced(historic!.update_at.getTime() > lastSync))
    
  }, [])

  return (
    <Container>
      <Header title={title} />

      <Content>
        <Label>Placa do veículo</Label>
        <LicensePlate>{historic?.license_plate}</LicensePlate>

        <Label>Finalidade</Label>
        <Description>{historic?.description}</Description>
      </Content>
      { historic?.status === 'departure' &&
        <Footer>
          <ButtonIcon icon={X} onPress={handleRemoveVehicleUsage} />
          <Button title='Registrar chegada' onPress={handleArrivalRegister} />
        </Footer>
      }

      { dataNotSynced && (
        <AsyncMessage> Sincronização da
          {historic?.status === 'departure' ? 'partida' : 'chegada'} pendente.
        </AsyncMessage>
      )}
    </Container>
  )
}