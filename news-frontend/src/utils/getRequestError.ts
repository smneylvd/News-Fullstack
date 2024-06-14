export const getRequestError = (e: any): string => {
    try {
        console.log(e.response);
        if (e.response) {
            if (e.response.data) {
                if (e.response.data.errors) {
                    return e.response.data.errors[0].msg;
                }
                if (e.response.data.error) {
                    return e.response.data.error;
                }
            }
            if (e.response.message) {
                return e.response.message;
            }
            if (e.response.error) {
                return e.response.error;
            }
            if (e.response.detail) {
                return e.response.detail[0];
            }
            if (e.response.data) {
                return e.response.data;
            }
            if (e.reponse.data.detail) {
                return e.reponse.data.detail[0];
            }
        } else {
            return "Network Error";
        }
    } catch (err) {
        console.log("ERROR PARSING RESPONSE: ", err);
    }
    return "Network Error";

};