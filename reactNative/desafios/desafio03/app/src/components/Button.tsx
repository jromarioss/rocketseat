import { Button as NativeBaseButton, IButtonProps, Text } from 'native-base'

interface ButtonProps extends IButtonProps {
  title: string
  variant?: 'solid' | 'outline'
}

export function Button({ title, variant = 'solid', ...rest }: ButtonProps) {
  return (
    <NativeBaseButton 
      w='100%'
      h={42}
      backgroundColor={ variant === 'solid' ? 'blue-light' : 'gray.500' }
      {...rest}
    >
      <Text 
        color={ variant === 'solid' ? 'gray.700' : 'gray.100' }
        fontSize={14}
        fontFamily='heading'
        >
        { title }
      </Text>
    </NativeBaseButton>
  );
}
