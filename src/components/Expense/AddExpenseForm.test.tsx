import React from 'react';
import { render, screen, within } from '@testing-library/react';
import App from '../../App';
import { fireEvent } from '@testing-library/react';

describe('Creating Expenses', () => {
    test('Happy Case', () => {
        render(<App />);
        // get form elements
        const nameForm = screen.getByTestId("name-form");
        const costForm = screen.getByTestId("cost-form");

        //fill out forms
        fireEvent.input(nameForm, { target: {value: "testNote"}});
        fireEvent.input(costForm, { target: {value: "100"}});

        //click save
        const saveButton = screen.getByText("Save");
        fireEvent.click(saveButton);

        //verify values
        expect(screen.getByText("testNote")).toBeInTheDocument();
        expect(screen.getByText("$100")).toBeInTheDocument();

        expect(screen.getByText("Remaining: $9900")).toBeInTheDocument();
        expect(screen.getByText("Spent so far: $100")).toBeInTheDocument();
    });
    
    test('Negative Cost', () => {
        render(<App />);
        // get form elements
        const nameForm = screen.getByTestId("name-form");
        const costForm = screen.getByTestId("cost-form");

        //fill out forms
        fireEvent.input(nameForm, { target: {value: "testNote"}});
        fireEvent.input(costForm, { target: {value: "-100"}});

        //click save
        const saveButton = screen.getByText("Save");
        fireEvent.click(saveButton);

        //verify values
        expect(screen.queryByText("testNote")).toBeNull();
        expect(screen.queryByText("$100")).toBeNull();

        expect(screen.queryByText("Remaining: $9900")).toBeNull();
        expect(screen.queryByText("Spent so far: $100")).toBeNull();
    });

    test('Non Number Cost', () => {
        render(<App />);
        // get form elements
        const nameForm = screen.getByTestId("name-form");
        const costForm = screen.getByTestId("cost-form");

        //fill out forms
        fireEvent.input(nameForm, { target: {value: "testNote"}});
        fireEvent.input(costForm, { target: {value: "o"}});

        //click save
        const saveButton = screen.getByText("Save");
        fireEvent.click(saveButton);

        //verify values
        expect(screen.queryByText("testNote")).toBeNull();
        expect(screen.queryByText("$NaN")).toBeNull();

        expect(screen.queryByText("Remaining: $10000")).toBeInTheDocument();
        expect(screen.queryByText("Spent so far: $0")).toBeInTheDocument();
    });

    test('Overbudget', () => {
        render(<App />);
        // get form elements
        const nameForm = screen.getByTestId("name-form");
        const costForm = screen.getByTestId("cost-form");

        //fill out forms
        fireEvent.input(nameForm, { target: {value: "testNote"}});
        fireEvent.input(costForm, { target: {value: "10001"}});

        //click save
        const saveButton = screen.getByText("Save");
        fireEvent.click(saveButton);

        //verify values
        expect(screen.getByText("testNote")).toBeInTheDocument();
        expect(screen.getByText("$10001")).toBeInTheDocument();

        expect(screen.getByText("Remaining: $-1")).toBeInTheDocument();
        expect(screen.getByText("Spent so far: $10001")).toBeInTheDocument();
    });

    test('Empty Name and Cost', () => {
        render(<App />);
        // get form elements
        const nameForm = screen.getByTestId("name-form");
        const costForm = screen.getByTestId("cost-form");

        //fill out forms
        fireEvent.input(nameForm, { target: {value: ""}});
        fireEvent.input(costForm, { target: {value: ""}});

        //click save
        const saveButton = screen.getByText("Save");
        fireEvent.click(saveButton);

        //verify values
        expect(screen.queryByText("testNote")).toBeNull();
        expect(screen.queryByText("$100")).toBeNull();

        expect(screen.queryByText("Remaining: $10000")).toBeInTheDocument();
        expect(screen.queryByText("Spent so far: $0")).toBeInTheDocument();
    });
});