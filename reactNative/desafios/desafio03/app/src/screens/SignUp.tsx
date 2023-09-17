import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { 
  Box, Center, Icon, Heading, ScrollView, Text, Pressable, useToast, usePlatformProps 
} from 'native-base'

import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons, AntDesign } from '@expo/vector-icons'

import * as yup from 'yup'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'

import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { UsePhoto } from '@components/UsePhoto'

import Logo from '@assets/logo.svg'
import DefaultPhotoUser from '@assets/Avatar.png'

interface FormDataProps {
  name: string
  email: string
  phone: string
  password: string
  passwordConfirm: string
}

const signUpSchema = yup.object({
  name: yup.string().required('Informe seu nome.'),
  email: yup.string().required('Informe seu e-mail.').email('E-mail inválido.'),
  phone: yup.string().required('Informe seu telefone.'),
  password: yup.string().required('Informe a senha.').min(6, 'A senha deve conter pelo menos 6 digitos.'),
  passwordConfirm: yup.string().required('Confirme a senha.').oneOf([yup.ref('password')], 'Senha não confere.'),
})

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userPhoto, setUserPhoto] = useState<any>()

  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  })

  const toast = useToast()
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleBackToSignIn() {
    navigation.navigate('signIn')
  }

  const phoneField = watch('phone')
  const nameField = watch('name')

  async function handleSignUp({ name, email, phone, password }: FormDataProps) {
    try {
      setIsLoading(true)

      const data = new FormData(); 

      data.append('name', name)  
      data.append('email', email)
      data.append('tel', phone.replace(/\D/g, ""))
      data.append('password', password)
      data.append('avatar', userPhoto)

      await api.post('/users', data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })

      toast.show({
        title: 'Usuário criado com sucesso.',
        placement: 'top',
        bgColor: 'green.500',
        duration: 3000,
      })

      navigation.navigate('signIn')
  
    } catch(error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível criar uma conta'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
        duration: 3000,
      })

    } finally {
      setIsLoading(false)
    }
  }

  async function handleUserPhotoSelector() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if(photoSelected.canceled) {
        return;
      }

      if(photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri);

        if(photoInfo.size && (photoInfo.size / 1024 / 1024) > 3) {
          return toast.show({
            title: 'Imagem muito grande, escolha uma imagem até 3mb',
            placement: 'top',
            bgColor: 'red.500',
            duration: 3000
          })
        }

        const fileExtension = photoSelected.assets[0].uri.split('.').pop()

        const nameUser = nameField.replace(' ', '')

        const photoFile = {
          name: `${nameUser}.${fileExtension}`.toLowerCase(),
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
      } as any;

        setUserPhoto(photoFile)
      }
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    phoneField &&
      setValue(
        "phone",
        phoneField.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
      );
  }, [phoneField]);

  return (
    <ScrollView bg='gray.700' showsVerticalScrollIndicator={false}>
      <Center>
        <Box mt={9} w={280}>
          <Center>
            <Logo />

            <Heading>
              Boas vindas!
            </Heading>

            <Text fontSize={14} textAlign='center' mb={2}>
              Crie sua conta e use o espaço para comprar itens variados e vender seus produtos
            </Text>

            <UsePhoto
              source={userPhoto ? { uri: userPhoto.uri } : DefaultPhotoUser }
              alt='Imagem do usuário'
              size={88}
            />

            <Pressable
              w={10} h={10}  position='absolute' top={195} right={85}
              backgroundColor='blue-light' rounded='full' alignItems='center'
              justifyContent='center'
              onPress={handleUserPhotoSelector}
            >
              <Icon 
                as={AntDesign} name='edit'
                size={4} color='gray.700'
              />
            </Pressable>

            <Controller
              control={control}
              name='name'
              render={({ field: { onChange, value}}) => (
                <Input
                  mt={4}
                  placeholder='Nome'
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name='email'
              render={({ field: { onChange, value }}) => (
                <Input
                  placeholder='E-mail'
                  keyboardType='email-address'
                  autoCapitalize='none'
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name='phone'
              render={({ field: { onChange, value }}) => (
                <Input
                  placeholder='Telefone'
                  keyboardType='phone-pad'
                  maxLength={15}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.phone?.message}
                />
              )}
            />

            <Controller
              control={control}
              name='password'
              render={({ field: { onChange, value }}) => (
                <Input
                  type={ showPassword ? 'text' : 'password' }
                  InputRightElement={
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                      <Icon 
                        as={MaterialIcons}
                        name={ showPassword ? 'visibility-off' : 'visibility' }
                        size={5} mr={4} color='gray.300'
                      />
                    </Pressable>
                  }
                  placeholder='Senha'
                  autoCapitalize='none'
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Controller 
              control={control}
              name='passwordConfirm'
              render={({ field: { onChange, value}}) => (
                <Input
                  type={ showConfirmPassword ? 'text' : 'password' }
                  InputRightElement={
                    <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                      <Icon 
                        as={MaterialIcons}
                        name={ showConfirmPassword ? 'visibility-off' : 'visibility' }
                        size={5} mr={4} color='gray.300'
                      />
                    </Pressable>
                  }
                  placeholder='Confirma senha'
                  autoCapitalize='none'
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.passwordConfirm?.message}
                />
              )}
            />

            <Button 
              title='Criar' mt={2} backgroundColor='gray.100'
              isLoading={isLoading}
              onPress={handleSubmit(handleSignUp)}
            />

            <Text mt={8}>
              Já tem uma conta?
            </Text>

            <Button 
              title='Ir para o login' variant='outline' mt={4} mb={10}
              onPress={handleBackToSignIn}
            />
          </Center>
        </Box>
      </Center>
    </ScrollView>
  )
}
