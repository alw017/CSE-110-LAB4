import { Database } from "sqlite";
import { Expense } from "../types";
import { Request, Response } from "express";

export async function createExpenseServer(req: Request, res: Response, db: Database) {
    const { id, cost, description } = req.body as { id:string, cost: number, description: string};
    if (!description || !id || !cost) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    try {
        await db.run('INSERT INTO expenses (id, description, cost) VALUES (?, ?, ?);', [id, description, cost]);
    } catch (error) {
        return res.status(400).send({ error: `Expense could not be created, + ${error}` });
    };

   res.status(201).send({ id, description, cost });
}

export async function deleteExpense(req: Request, res: Response, db: Database) {

    let delete_id = req.params.id as string;

    try {
        let result = await db.get('SELECT DISTINCT 1 FROM expenses WHERE id = ?;', [delete_id]);
        if (result[1] == 1) {
            await db.run('DELETE FROM expenses WHERE id = ?', [delete_id]);
            return res.status(201).send({ deleted_id: delete_id });
        } else {
            throw Error("id " + req.params.id + " doesn't exist");
        }
    } catch (error) {
        return res.status(400).send({ error: `Expense could not be deleted, ${error}`});
    }
}

export async function getExpenses(req: Request, res: Response, db: Database) {
    try {
        var expenseArray = await db.all(`SELECT * FROM expenses;`);
        return res.status(201).send({ data: expenseArray });
    } catch (error) {
        return res.status(400).send({ error: `Expenses could not be retrieved, + ${error}`});
    }
}