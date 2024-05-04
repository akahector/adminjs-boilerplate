import { encryptPassword } from "../../../utils/encryption.js";
export const beforeEdit = async (request) => {
    if (request.method === 'post') {
        if (request.payload?.password) {
            request.payload.password = await encryptPassword(request.payload.password);
        }
        else {
            delete request.payload?.password;
        }
    }
    return request;
};
export const afterEdit = async (response) => {
    response.record.params.password = '';
    return response;
};
