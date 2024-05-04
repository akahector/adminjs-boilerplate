import { RecordActionResponse } from "adminjs";
import { encryptPassword } from "../../../utils/encryption.js";

export const  beforeShow = async (request) => {
    if (request.payload?.password) {
      request.payload.password = await encryptPassword(request.payload.password);
    }
    return request;
  }

export const afterShow= async (response: RecordActionResponse) => {
    response.record.params.password = '';
    return response;
  }