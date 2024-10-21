import { createContext, useState } from "react";
import { Expense } from "../types/types";

// Exercise: Create add budget to the context

interface AppContextType {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  budget: number;
  setBudget: React.Dispatch<React.SetStateAction<number>>;
  id: number;
  setId: React.Dispatch<React.SetStateAction<number>>;
}

const initialState: AppContextType = {
  expenses: [],
  setExpenses: () => {},
  budget: 10000,
  setBudget: () => {},
  id: 0,
  setId: () => {},
};

export const AppContext = createContext<AppContextType>(initialState);

export const AppProvider = (props: any) => {
  const [expenses, setExpenses] = useState<Expense[]>(initialState.expenses);
  const [budget, setBudget] = useState(initialState.budget);
  const [id, setId] = useState(0);

  return (
    <AppContext.Provider
      value={{
        expenses: expenses,
        setExpenses: setExpenses,
        budget: budget,
        setBudget: setBudget,
        id: id,
        setId: setId,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
