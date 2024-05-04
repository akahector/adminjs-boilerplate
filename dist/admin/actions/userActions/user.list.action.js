export const afterList = async (response) => {
    response.records.forEach((record) => {
        record.params.password = '';
    });
    return response;
};
