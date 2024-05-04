import { RecordActionResponse } from "adminjs";
import { encryptPassword } from "../../../utils/encryption.js";

export const beforeEdit = async (request) => {
    // no need to hash on GET requests, we'll remove passwords there anyway
    if (request.method === 'post') {
      // hash only if password is present, delete otherwise
      // so we don't overwrite it
      if (request.payload?.password) {
        request.payload.password = await encryptPassword(request.payload.password);
      } else {
        delete request.payload?.password;
      }
    }
    return request;
  }

  export const afterEdit = async (response: RecordActionResponse) => {
    response.record.params.password = '';
    return response;
  }