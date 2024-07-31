import { message } from 'antd';

export const errorHandler = (error: any) => {
    console.log("code here");
    if (error.response) {
        console.log("code here too: ", error.response);
        if (Array.isArray(error.response.data.message)) {
            for (const key in error.response.data.message) {
                message.error(startErrorWithUpperCase(error.response.data.message[key]));
            }
        } else {
            message.error(startErrorWithUpperCase(error.response.data.message));
        }
    }
    // Ensure the error is propagated back to the calling code
    return Promise.reject(error);
};

const startErrorWithUpperCase = (message: string) => {
    return message.charAt(0).toUpperCase() + message.slice(1);
};