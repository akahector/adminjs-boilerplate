import { encryptPassword } from "../../../utils/encryption.js";
export const beforeShow = async (request) => {
    if (request.payload?.password) {
        request.payload.password = await encryptPassword(request.payload.password);
    }
    return request;
};
export const afterShow = async (response) => {
    response.record.params.password = '';
    return response;
};
