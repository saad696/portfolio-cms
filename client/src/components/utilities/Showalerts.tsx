import { Alert } from 'antd';
import React, { useEffect, useState } from 'react';

interface AlertProps {
    msg: string;
    duration: number;
    type: number;
}

const Showalerts: React.FC<AlertProps> = ({ msg, duration = 2500, type }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
    }, [msg]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, duration);

        return () => {
            clearTimeout(timer);
        };
    }, [duration]);

    return (
        <>
            {visible && type === 1 && (
                <Alert
                    message='Success'
                    description={msg}
                    type='success'
                    showIcon
                    closable
                />
            )}
            {visible && type === 2 && (
                <Alert
                    message='Info'
                    description={msg}
                    type='info'
                    showIcon
                    closable
                />
            )}
            {visible && type === 3 && (
                <Alert
                    message='Warning'
                    description={msg}
                    type='warning'
                    showIcon
                    closable
                />
            )}
            {visible && type === 4 && (
                <Alert
                    message='Error'
                    description={msg}
                    type='error'
                    showIcon
                    closable
                />
            )}
        </>
    );
};

export default Showalerts;
