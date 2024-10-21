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

describe('Delete Expenses Tests', () => {
    test('Typical Case', () => {
        render(<App/>);
        createExpense("test","100");
        createExpense("test1","1000");
        createExpense("test2","10");
        const deleteButton = screen.getByTestId("button-1");
        fireEvent.click(deleteButton);

        expect(screen.queryByText("test1")).toBeNull();
        expect(screen.getByText("test")).toBeInTheDocument();
        expect(screen.getByText("test2")).toBeInTheDocument();

        expect(screen.getByText("Remaining: $9890")).toBeInTheDocument();
        expect(screen.getByText("Spent so far: $110")).toBeInTheDocument();
    });
    test('Delete all', () => {
        render(<App/>);
        createExpense("test","100");
        createExpense("test1","1000");
        createExpense("test2","10");

        for (let i = 0; i < 3; i++) {
            fireEvent.click(screen.getByTestId("button-"+i));
        }

        expect(screen.queryByText("test1")).toBeNull();
        expect(screen.queryByText("test")).toBeNull();
        expect(screen.queryByText("test2")).toBeNull();

        expect(screen.queryByText("Remaining: $9890")).toBeNull();
        expect(screen.queryByText("Spent so far: $110")).toBeNull();
    });
});