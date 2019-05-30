import superagentPromise from "superagent-promise";
import _superagent from "superagent";

const superagent = superagentPromise(_superagent, global.Promise);

const OFFLINE_API_ROOT = "http://localhost:8102/api";
const ONLINE_API_ROOT = "http://private-9aad-note10.apiary-mock.com";

const offline = false;

let API_ROOT = offline ? OFFLINE_API_ROOT : ONLINE_API_ROOT;
/*if (process.env.NODE_ENV === "development") {
    API_ROOT = offline ? OFFLINE_API_ROOT : ONLINE_API_ROOT;
}*/

const responseBody = res => res.body;


const handleErrors = err => {
    if (err && err.response && err.response.status === 401) {
    }
    return err;
};

const requests = {
    del: (url, body) =>
        superagent
            .del(`${API_ROOT}${url}`)
            .send(`${body}`)
            .end(handleErrors)
            .then(responseBody),
    get: url =>
        superagent
            .get(`${API_ROOT}${url}`)
            .end(handleErrors)
            .then(responseBody),
    put: (url, body) =>
        superagent
            .put(`${API_ROOT}${url}`)
            .send(`${body}`)
            .set("Content-Type", "application/x-www-form-urlencoded")
            .then(responseBody),
    post: (url, body) =>
        superagent
            .post(`${API_ROOT}${url}`)
            .type("form")
            .send(`${body}`)
            .set("Content-Type", "application/x-www-form-urlencoded")
            .then(responseBody)
};

const NOTES = "/notes";

const Notes = {
    /**
     * Create new note
     * @param body : complete data to create note
     */
    createNote: (body) => requests.post(`${NOTES}`, body),

    /**
     * Delete note
     * @param noteId : id of specific note
     */
    removeNote: (noteId) => requests.del(`${NOTES}/${noteId}`),

    /**
     * Gains notes
     */
    getNotes: () => requests.get(`${NOTES}`),

    /**
     * Gain specific note
     * @param noteId: id of specific note
     */
    getNote: (noteId) => requests.get(`${NOTES}/${noteId}`),

    /**
     * Update note
     * @param noteId: id of specific note
     * @param body: complete new data to edit note
     */
    editNote: (noteId, body) => requests.put(`${NOTES}/${noteId}`, body),
};


export default {
    Notes
};
