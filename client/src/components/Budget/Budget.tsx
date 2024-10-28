import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchBudget, setBudget } from "../../utils/budget-utils";

const Budget = () => {
  const context = useContext(AppContext);  
  const [inputBudget, setInputBudget] = useState("");

  useEffect(() => {
	loadBudget();
  }, []);

  // Function to load expenses and handle errors
  const loadBudget = async () => {
	try {
  	const budget = await fetchBudget();
  	context.setBudget(budget);
	} catch (err: any) {
  	console.log(err.message);
	}
  };


  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const testValidInput = parseFloat(inputBudget);
    if (isNaN(testValidInput) || !isFinite(testValidInput)) {
        const costInputForm = document.getElementById("budget") as HTMLInputElement;
        costInputForm.setCustomValidity("Budget must be a valid number.");
        costInputForm.reportValidity();
        return;
    }
    
    // check cost is positive
    if (testValidInput < 0) {
        const costInputForm = document.getElementById("budget") as HTMLInputElement;
        costInputForm.setCustomValidity("Budget must be positive.");
        costInputForm.reportValidity();
        return;
    }

    context.setBudget(testValidInput);
    console.log("setting budget");
    setBudget(testValidInput);
  }

  const changeBudget = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.currentTarget.setCustomValidity('');
    let costStr = event.currentTarget.value;
    console.log("cost change to", costStr);
    setInputBudget(costStr);
  };

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
    <div>
       <div>Budget: ${context.budget.toString()}</div> 
    </div>
      <form onSubmit={(event) => onSubmit(event)}>
      <div className="row">
        <div className="col-sm">
          <input
            required
            type="text"
            className="form-control"
            id="budget"
            value={inputBudget}
            onChange={(event) => changeBudget(event)}
          ></input>
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </div>
      </form>
    </div>
  );
};

export default Budget;
