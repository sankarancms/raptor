export const resJSON = (success = false, message = '', data = {}, errors = {}) => {
    return {
        success, message, data, errors
    }
}
