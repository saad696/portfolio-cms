import { message } from 'antd';

// error handler
message.config({
    maxCount: 1,
});

export const handleErrors = (err: any) => {
    if (typeof err === 'string') {
        message.error(err);
    } else if (typeof err?.message === 'string') {
        message.error(err.message);
    } else {
        message.error('Smething went wrong!');
    }
};

// titlecase
export const toTitleCase = (str: string): string => {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

export const skillTagColors = (num: number): string => {
    console.log(num);
    let color = 'magenta';
    switch (num) {
        case 1:
            color = 'magenta';
            break;
        case 2:
            color = 'red';
            break;
        case 3:
            color = 'volcano';
            break;
        case 4:
            color = 'orange';
            break;
        case 5:
            color = 'gold';
            break;
        case 6:
            color = 'lime';
            break;
        case 7:
            color = 'green';
            break;
        case 8:
            color = 'cyan';
            break;
        case 9:
            color = 'blue';
            break;
        case 10:
            color = 'purple';
            break;
    }

    return color;
};
