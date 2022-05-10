import { Col, Row, Form, Input, Button, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { ShowAlert } from '..';
import customAxios from '../../axios.config';
import { BioApiResponse, BioFormValues } from '../../interfaces/bio.interface';

const { TextArea } = Input;

const Bio = () => {
    const [bio, setBio] = useState();

    const onSubmit = (values: BioFormValues) => {
        console.log(values.bio);

        customAxios
            .post<BioApiResponse>('/create-bio', { bio: values.bio })
            .then((res) => {
                message.success(res.data.message);
            })
            .catch((err) => {
                message.error(err);
            });
    };

    useEffect(() => {
      
    })
    return (
        <>
            <Form layout='vertical' onFinish={onSubmit}>
                <Row>
                    <Col xs={12}>
                        <Form.Item
                            label='Enter Bio'
                            name='bio'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your Bio!',
                                },
                                {
                                    min: 20,
                                    message:
                                        'Bio length should be greater than 20 characters',
                                },
                            ]}
                        >
                            <TextArea
                                rows={4}
                                allowClear={true}
                                showCount={true}
                                maxLength={300}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col>
                        <Button type='primary' htmlType='submit'>
                            Add
                        </Button>
                    </Col>
                    <Col>
                        <Button>Edit</Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default Bio;
