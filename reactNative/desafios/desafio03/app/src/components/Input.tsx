import { Input as NativeBaseInput, IInputProps, FormControl } from 'native-base'

type InputProps = IInputProps & {
  errorMessage?: string | null
}

export function Input({ errorMessage = null, isInvalid, ...rest }: InputProps) {
  const invalid = !!errorMessage || isInvalid
  return (
    <FormControl isInvalid={invalid} mb={3}>
      <NativeBaseInput 
        h={45}
        px={4}
        backgroundColor='white'
        borderWidth={0}
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.500'
        }}
        placeholderTextColor='gray.400'
        fontFamily='body'
        fontSize={16}
        _focus={{
          borderWidth: 1,
          borderColor: 'gray.300',
          color: 'gray.200'
        }}
        {...rest}
      />
      <FormControl.ErrorMessage>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}
