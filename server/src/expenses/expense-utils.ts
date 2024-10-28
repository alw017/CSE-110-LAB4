import { expenses } from "../constants";
import { Expense } from "../types";
import { Request, Response } from "express";

var nextId = expenses.length + 1;

export function createExpenseServer(req: Request, res: Response, expenses: Expense[]) {
    const { id, cost, description } = req.body;
    if (!description || !id || !cost) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    const newExpense: Expense = {
        id: nextId.toString(),
        description,
        cost,
    };

    nextId++;
    expenses.push(newExpense);
    res.status(201).send(newExpense);
}

export function deleteExpense(req: Request, res: Response, expenses: Expense[]) {
    const index = expenses.findIndex((item)=>{return item.id === req.params.id });
    expenses.splice(index, 1);

    res.status(200).send({"deleted-id":req.params.id, "expenses": expenses});
}

export function getExpenses(req: Request, res: Response, expenses: Expense[]) {
    res.status(200).send({ "data": expenses });
}