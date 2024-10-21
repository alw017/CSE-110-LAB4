import React, { useState, useEffect, useContext } from "react";
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

    // check input is valid number
    const testValidInput = parseFloat(cost);
    if (isNaN(testValidInput) || !isFinite(testValidInput)) {
        const costInputForm = document.getElementById("cost") as HTMLInputElement;
        costInputForm.setCustomValidity("Input must be a valid number.");
        costInputForm.reportValidity();
        return;
    }
    
    // check cost is positive
    if (testValidInput < 0) {
        const costInputForm = document.getElementById("cost") as HTMLInputElement;
        costInputForm.setCustomValidity("Cost must be positive.");
        costInputForm.reportValidity();
        return;
    }


    // Exercise: Add add new expense to expenses context array
    const newExpense : Expense = {id: expensesContext.id.toString(), name: name, cost: parseFloat(cost)}
    const newExpenses : Expense[] = expensesContext.expenses.concat(newExpense);

    expensesContext.setId(expensesContext.id + 1);
    expensesContext.setExpenses(newExpenses);

    console.log(expensesContext.id);
  };

  useEffect(() => {
    const totalExpenses = expensesContext.expenses.reduce((total, item) => {
        return (total = total + item.cost);
    }, 0);

    if(totalExpenses > 1000) {
        alert("You have exceeded your budget!");
    }

  }, [expensesContext.expenses]);

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    let name = event.currentTarget.value;
    console.log("name change to", name)
    setName(name);
  };

  const changeCost = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.currentTarget.setCustomValidity('');
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
            data-testid="name-form"
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
            data-testid="cost-form"
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
