import { api } from '@services/api';
import { Image, View} from 'native-base'
import { Dimensions } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'

interface ImagePreviewCarouselProps {
  images: [
    {
      path: string;
      id: string;
    }
  ]
}

export function ImageCarousel({ images }: ImagePreviewCarouselProps) {
  const width = Dimensions.get('window').width;

  return (
    <View w={width} h={280} >
      <Carousel
        loop
        width={width}
        autoPlay={true}
        data={images}
        scrollAnimationDuration={2000}
        onSnapToItem={index => index}
        renderItem={({ item, index }) => (
          <Image
            key={index}
            source={{ uri: `${api.defaults.baseURL}/images/${item.path}` }}
            h={300}
            w="100%"
            alt='images'
          />
        )}
      />
    </View>
  )
}
