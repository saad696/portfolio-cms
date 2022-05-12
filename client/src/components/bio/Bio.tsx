import { Col, Row, Form, Input, Button, message } from 'antd';
import { useEffect, useState } from 'react';
import customAxios from '../../axios.config';
import {
    PostResponse,
    BioData,
    BioFormValues,
} from '../../interfaces/interface';
import { handleErrors } from '../utils/helpers';

const { TextArea } = Input;

const Bio = () => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [bioId, setBioId] = useState<string>();
    const [bioForm] = Form.useForm();

    const onSubmit = (values: BioFormValues) => {
        if(!isEdit) {
            customAxios
            .post<PostResponse>('/create-bio', { bio: values.bio })
            .then((res) => {
                message.success(res.data.message);
            })
            .catch((err) => {
                handleErrors(err);
            });
        } else {
            customAxios
            .put<PostResponse>(`/update-bio/${bioId}`, { bio: values.bio })
            .then((res) => {
                message.success(res.data.message);
            })
            .catch((err) => {
                handleErrors(err);
            });
        }
    };

    useEffect(() => {
        customAxios
            .get<BioData>('/get-bio')
            .then((data) => {
                if (data.data.data.bio) {
                    setIsEdit(true);
                    setBioId(data.data.data._id);
                    bioForm.setFieldsValue({
                        bio: data.data.data.bio,
                    });
                } else {
                    setIsEdit(false);
                }
            })
            .catch((err) => {
                handleErrors(err);
            });
    }, []);

    return (
        <>
            <Form layout='vertical' onFinish={onSubmit} form={bioForm}>
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
                            {!isEdit ? 'Add' : 'Edit'}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default Bio;
