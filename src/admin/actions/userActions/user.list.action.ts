import { ListActionResponse } from "adminjs";

export const afterList = async (response: ListActionResponse) => {
    response.records.forEach((record) => {
      record.params.password = '';
    });
    return response;
  }