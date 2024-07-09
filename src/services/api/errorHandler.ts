import { message } from 'antd';

export const errorHandler = (error: any) => {
    if (error.response) {
        if (error.response.data.message.length > 1) {
            error.response.data.message.forEach((item: any) => {
                message.error(startErrorWithUpperCase(item));
            });
        } else {
            message.error(startErrorWithUpperCase(error.response.data.message));
        }
    }
};

const startErrorWithUpperCase = (message: string) => {
    return message.charAt(0).toUpperCase() + message.slice(1);
};
