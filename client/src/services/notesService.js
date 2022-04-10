import { baseUrl } from "../constants";

const getAll = async (userId, token, secure, sortingOrder) => {
    const response = await fetch(`${baseUrl}/notes/${userId}?secure=${secure}&sorting=${sortingOrder}`, {
        headers: {
            'Authorization': `Token ${token}`
        }
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data);
    }

    return data;
}

const getOne = async (userId, noteId, token) => {
    const response = await fetch(`${baseUrl}/note/${userId}/${noteId}`, {
        headers: {
            'Authorization': `Token ${token}`
        }
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data);
    }

    return data;
}

const createOne = async (user, data) => {
    const response = await fetch(`${baseUrl}/share-day/${user.user_id}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${user.token}`
        }
    });

    if (!response.ok) {
        throw new Error(data);
    }

    return { status: 'success' };
}

export const notesService = { getAll, getOne, createOne };