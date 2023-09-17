import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { useTheme } from 'native-base'

import { MyAd } from '@screens/MyAd'
import { Home } from '@screens/Home'
import { SignIn } from '@screens/SignIn'
import { CreateAd } from '@screens/CreateAd'
import { EditMyAd } from '@screens/EditMyAd'
import { MyProduct } from '@screens/MyProduct'
import { ProductToBuy } from '@screens/ProductToBuy'
import { PreviewProduct } from '@screens/PreviewProduct'

import Tag from '@assets/tag.svg'
import House from '@assets/house.svg'
import SignOut from '@assets/signOut.svg'
import { useAuth } from '@hooks/useAuth'
import { NewProductDTO } from '@dtos/NewProductDTO'

type AppRoutesProps = {
  home: undefined
  myAd: undefined
  signOut: undefined
  productToBuy: { productId: string }
  createAd: undefined
  editMyAd: { productId: string }
  previewProduct: { product: string, edit?: boolean }
  myProduct: { myProductId: string }
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutesProps>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesProps>()

export function AppRoutes() {
  const { sizes, colors } = useTheme()
  const { signOut } = useAuth()

  const iconSize = sizes[7]

  return(
    <Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: colors.gray[100],
      tabBarInactiveTintColor: colors.gray[400],
      tabBarStyle: {
        backgroundColor: colors.gray[700],
        borderTopWidth: 0,
      }
    }}
    >
      <Screen 
        name='home'
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <House fill={color} width={iconSize} height={iconSize} />
          ),
          tabBarItemStyle: {
            backgroundColor: 'gray.200'
          }
        }}
      />

      <Screen 
        name='myAd'
        component={MyAd}
        options={{
          tabBarIcon: ({ color }) => (
            <Tag fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />

      <Screen 
        name='signOut'
        component={SignIn}
        options={{
          tabBarIcon: () => (
            <SignOut fill={'#EE7979'} width={iconSize} height={iconSize} />
          )
        }}
        listeners={() => ({
          tabPress: async () => {
            await signOut()
          }
        })}
      />

      <Screen 
        name='productToBuy'
        component={ProductToBuy}
        options={{
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' }
        }}
      />

      <Screen 
        name='createAd'
        component={CreateAd}
        options={{
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' }
        }}
      />

      <Screen 
        name='myProduct'
        component={MyProduct}
        options={{
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' }
        }}
      />

      <Screen 
        name='editMyAd'
        component={EditMyAd}
        options={{
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' }
        }}
      />

      <Screen 
        name='previewProduct'
        component={PreviewProduct}
        options={{
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' }
        }}
      />
    </Navigator>
  )
}
