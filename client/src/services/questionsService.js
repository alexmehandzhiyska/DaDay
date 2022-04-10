import { baseUrl } from "../constants";

const getOne = async (userId, token) => {
    const response = await fetch(`${baseUrl}/share-day/${userId}`, {
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data);
    }

    return data;
}

export const questionsService = { getOne };