import React from 'react';
import { render, screen, within } from '@testing-library/react';
import App from '../../App';
import { fireEvent } from '@testing-library/react';

describe('', () => {
    test('', () => {
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
});