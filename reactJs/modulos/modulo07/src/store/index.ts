import { configureStore, createSlice } from '@reduxjs/toolkit'
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'
import { player } from './slices/player'

/* const todoSlice = createSlice({
  name: 'todo',
  initialState: ['fazer café', 'estudar redux', 'comer bolo'],
  reducers: {
    // state é oque já tem no estado, e action a nova ação nome e ação todo/add payload a info que vem dentro do disparo
      add: (state, action) => {
      state.push(action.payload.newTodo)
    }
  }
}) */

export const store = configureStore({ // estado global
  reducer: {
    //todo: todoSlice.reducer,
    player,
  }
})

//export const { add } = todoSlice.actions //exporta o add

export type RootState = ReturnType<typeof store.getState> // retorna o formato do estado
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch
