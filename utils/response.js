export const createResponse = (payload, statusCode, success) => {
    return {
        success,
        statusCode,
        payload
    }
}
