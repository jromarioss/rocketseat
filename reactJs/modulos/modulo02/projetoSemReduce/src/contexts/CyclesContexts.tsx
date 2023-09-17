import { ReactNode, createContext, useState } from 'react'

interface CreateCyclesData {
  task: string
  minutesAmount: number
}

interface Cycles {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  finishedDate?: Date
  interruptedDate?: Date
}

interface CyclesContextType {
  cycles: Cycles[]
  activeCycle: Cycles | undefined
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCyclesData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycles, setCycles] = useState<Cycles[]>([])
  const [activeCycledId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycledId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        // se o ciclo for o ciclo ativo
        if (cycle.id === activeCycledId) {
          return { ...cycle, finishedDate: new Date() } // retorna o ciclo com o novo finalizado
        } else {
          return cycle
        }
      }),
    )
  }

  function createNewCycle(data: CreateCyclesData) {
    const id = String(new Date().getTime()) // retorna em milissegundos

    const newCycle: Cycles = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    // reset()
  }

  function interruptCurrentCycle() {
    // percorre todos os ciclos
    setCycles((state) =>
      state.map((cycle) => {
        // se o ciclo for o ciclo ativo
        if (cycle.id === activeCycledId) {
          return { ...cycle, interruptedDate: new Date() } // retorna o ciclo com o novo interruptedDate
        } else {
          return cycle
        }
      }),
    )

    setActiveCycleId(null)
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
