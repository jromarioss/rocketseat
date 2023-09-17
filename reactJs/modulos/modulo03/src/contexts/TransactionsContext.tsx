import { ReactNode, useEffect, useState, useCallback } from "react";
import { createContext } from 'use-context-selector';
import { api } from "../lib/axios";

interface TransactionProps {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

interface CreateTransactionInput {
  description: string,
  category: string,
  price: number,
  type: 'income' | 'outcome',
}

interface TransactionContextType {
  transactions: TransactionProps[];
  fetchTransactions: (query?: string) => Promise<void>; /* Promise pq é uma função asincrona */
  createTransactions: (data: CreateTransactionInput) => Promise<void>;
}

export const TransactionsContext = createContext({} as TransactionContextType);

interface TransactionsProviderProps {
  children: ReactNode; /* ReactNode é qualquer elemento válido */
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);

  const fetchTransactions = useCallback(async (query?: string) => { /* query de busca */
    //const url = new URL('/transactions');
    
    //if (query) { /* se tiver enviado algum tipo de query */
    //  url.searchParams.append('q', query); /* adicione um serach form na url */
    //}

    //const response = await fetch(url); /* consumir api fetch */
    //const data = await response.json(); /* converter para json */

    const response = await api.get('/transactions', {
      params: {
        _sort: 'createAt', /* ordernar os campos */
        _order: 'desc',
        q: query,
      }
    })

    setTransactions(response.data); /* adicionar o dados no estado transactions */
  }, []);

/* usecallback evita com que uma função seja recriado em memória se nem uma informação que aquela função dependa tenha mudado*/
  const createTransactions = useCallback(async (data: CreateTransactionInput) => {
    const { category, price, description, type } = data;

    const response = await api.post('transactions', {
      description,
      category,
      price,
      type,
      createdAt: new Date(),
    });

    setTransactions(state => [response.data, ...state]);
  }, []);

  useEffect(() => { /* o useeffect não pode ser asyncrono */
    fetchTransactions()
  }, [fetchTransactions]);


  return (
    <TransactionsContext.Provider value={{
      transactions,
      fetchTransactions,
      createTransactions,
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}