
import App from "../../App";
import { fireEvent, render, screen } from "@testing-library/react";

const createExpense = (title : string, cost : string) => {
        const nameForm = screen.getByTestId("name-form");
        const costForm = screen.getByTestId("cost-form");

        //fill out forms
        fireEvent.input(nameForm, { target: {value: title}});
        fireEvent.input(costForm, { target: {value: cost}});

        //click save
        const saveButton = screen.getByText("Save");
        fireEvent.click(saveButton);
}

describe('Budget Balance Verification', () => {
    test('Typical Case', () => {
        render(<App/>);
        createExpense("test","100");
        createExpense("test1","1000");
        createExpense("test2","10");

        expect(screen.getByText("Remaining: $8890")).toBeInTheDocument();
        expect(screen.getByText("Spent so far: $1110")).toBeInTheDocument();
    });
});