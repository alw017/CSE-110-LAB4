import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";
const AddExpenseForm = () => {
  // Exercise: Consume the AppContext here
  const expensesContext = useContext(AppContext);

  // Exercise: Create name and cost to state variables

  const [cost, setCost] = useState("");
  const [name, setName] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Exercise: Add add new expense to expenses context array
    const newExpense : Expense = {id: name, name: name, cost: parseFloat(cost)}
    const newExpenses : Expense[] = expensesContext.expenses.concat(newExpense);

    expensesContext.setExpenses(newExpenses);
  };

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    let name = event.currentTarget.value;
    console.log("name change to", name)
    setName(name);
  };

  const changeCost = (event: React.ChangeEvent<HTMLInputElement>) => {
    let costStr = event.currentTarget.value;
    console.log("cost change to", costStr);
    setCost(costStr);
  };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(event) => changeName(event)}
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="text"
            className="form-control"
            id="cost"
            value={cost}
            onChange={(event) => changeCost(event)}
          ></input>
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
