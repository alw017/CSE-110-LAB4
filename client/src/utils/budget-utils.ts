import { API_BASE_URL } from "../constants/constants";

export const fetchBudget = async (): Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/budget`);
    if (!response.ok) {
        throw new Error("Failed to get budget");
    }
    let budget = response.json().then((jsonResponse) => {
        console.log("budget data", jsonResponse);
        return jsonResponse.data;
    });
    return budget;
};

export const setBudget = async( budget: number): Promise<number> => {
    const obj = {data: budget};
	const response = await fetch(`${API_BASE_URL}/budget`, {
    	method: "PUT",
    	headers: {
        	"Content-Type": "application/json",
    	},
    	body: JSON.stringify(obj),
	});
	if (!response.ok) {
    	throw new Error("Failed to create expense");
	}
	return response.json();
};