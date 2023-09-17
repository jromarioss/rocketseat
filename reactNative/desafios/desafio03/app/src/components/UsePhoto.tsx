import { Image, IImageProps } from 'native-base'

interface UsePhotoProps extends IImageProps {
  size: number
}

export function UsePhoto({ size, ...rest }: UsePhotoProps) {
  return(
    <Image 
      w={size}
      h={size}
      rounded='full'
      borderWidth={2}
      borderColor='blue-light'
      {...rest}
    />
  )
}
