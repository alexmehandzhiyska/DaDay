import { baseUrl } from "../constants";

const getReport = async (userId) => {
    const response = await fetch(`${baseUrl}/notes/${userId}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data);
    }

    return data;
}

const getNote = async (noteId) => {
    const response = await fetch(`${baseUrl}/note/${noteId}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data);
    }

    return data;
}

const getOne = async (userId) => {
    const response = await fetch(`${baseUrl}/share-day/${userId}`, {
        headers: { 
            'Content-Type': 'application/json'
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
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(data);
    }

    return { status: 'success' };
}

export const notesService = { getReport, getOne, createOne, getNote };