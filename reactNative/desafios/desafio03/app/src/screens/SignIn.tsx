import { useState } from 'react'
import { 
  Center, Heading, Icon, Pressable, Text, Box, View, useToast 
} from 'native-base'

import { MaterialIcons } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'

import * as yup from 'yup'

import LogoSvg from '@assets/logo.svg'
import { useAuth } from '@hooks/useAuth'
import { AppError } from '@utils/AppError'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import { Input } from '@components/Input'
import { Button } from '@components/Button'

interface FormDataProps {
  email: string
  password: string
}

const signInSchema = yup.object({
  email: yup.string().required('Informe seu e-mail.').email('E-mail inválido.'),
  password: yup.string().required('Informe a senha.'),
})

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { control, handleSubmit, formState: { errors }} = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema),
    defaultValues: { email: '', password: '' }
  })

  const { signIn } = useAuth() 
  const toast = useToast()
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleCreateAccount() {
    navigation.navigate('signUp')
  }

  async function handleSignIn({ email, password }: FormDataProps) {
    try {
      setIsLoading(true)
      await signIn(email, password)
    } catch(error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível entrar. Tente novamente mais tarde!";

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
        duration: 3000,
      });
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View bg='white' flex={1}>
      <Center bg='gray.600' rounded='3xl'>
        <Box w={280} pt={65} pb={68}>
          <Center>
            <LogoSvg />

            <Heading fontSize={32}>
              marketSpace
            </Heading>
            
            <Text mb={60}>
              Seu espaço de compra e venda
            </Text>

            <Text mb={4}>
              Acesse sua Conta
            </Text>

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
              name='password'
              render={({ field: { onChange, value }}) => (
                <Input
                  type={ showPassword ? 'text' : 'password' }
                  InputRightElement={
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                      <Icon 
                        as={MaterialIcons}
                        name={ showPassword ? 'visibility-off': 'visibility' }
                        size={5}
                        mr={4}
                        color='gray.300'
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

            <Button mt={8} title='Entrar' onPress={handleSubmit(handleSignIn)} isLoading={isLoading} />
          </Center>
        </Box>  
      </Center>

      <Center>
        <Box width={280}>
          <Center>
            <Text mt={54} mb={4} fontSize={14}>
              Ainda não tem acesso?
            </Text>

            <Button
              onPress={handleCreateAccount}
              title='Criar uma conta' variant='outline' 
            />
          </Center>
        </Box>
      </Center>
    </View>
  )
}
