import {
    Button,
    Col,
    Divider,
    Form,
    Input,
    message,
    Popconfirm,
    Row,
    Select,
    Tag,
    Typography,
} from 'antd';
import { useEffect, useState } from 'react';
import { SkillsState } from '../../interfaces/interface';

import {
    handleErrors,
    skillTagColors,
    toTitleCase,
} from '../utils/helpers';
import { addSkills, removeSkill, getSkills } from './apis';

const { Title } = Typography;
const { Option } = Select;

const Skills = () => {
    const [skillsForm] = Form.useForm();
    // loading state
    const [loading, setLoading] = useState<Boolean>(false);

    const [skills, setSkills] = useState<SkillsState[]>();

    const onSubmit = (values: any) => {
        addSkills(values)
            .then((res) => {
                message.success(res.data.message);
                skillsForm.resetFields();
                getSkillsData();
            })
            .catch((err) => {
                handleErrors(err);
            });
    };

    const removeSkillTag = (id: string) => {
        removeSkill(id)
            .then((res) => {
                message.success(res.data.message);
                getSkillsData();
            })
            .catch((err) => {
                handleErrors(err);
            });
    };

    const getSkillsData = () => {
        getSkills()
            .then((data) => {
                setSkills(data.data.data);
            })
            .catch((err) => {
                handleErrors(err);
            });
    };

    useEffect(() => {
        getSkillsData();
    }, []);

    return (
        <>
            <Form layout='vertical' onFinish={onSubmit} form={skillsForm}>
                <Row gutter={[16, 0]}>
                    <Col xs={8}>
                        <Form.Item
                            label='Enter Skill'
                            name='skillName'
                            rules={[
                                {
                                    required: true,
                                    message: 'This field cannot be empty.',
                                },
                            ]}
                        >
                            <Input placeholder='Eg: Javascript' allowClear />
                        </Form.Item>
                    </Col>
                    <Col xs={8}>
                        <Form.Item
                            label='Skill Type'
                            name='type'
                            rules={[
                                {
                                    required: true,
                                    message: 'This field cannot be empty.',
                                },
                            ]}
                        >
                            <Select>
                                <Option value='frontend'>Frontend</Option>
                                <Option value='backend'>Backend</Option>
                                <Option value='devops'>DevOps</Option>
                                <Option value='cloud'>Cloud</Option>
                                <Option value='mobile-development'>
                                    Mobile Development
                                </Option>
                                <Option value='hard-skills'>Hard Skills</Option>
                                <Option value='soft-skills'>Soft Skills</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={8}>
                        <Form.Item
                            label='Enter Image Url'
                            name='imageUrl'
                            rules={[
                                {
                                    pattern: new RegExp(
                                        /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
                                    ),
                                    message: 'Please enter a valid URL.',
                                },
                            ]}
                            extra={
                                <small>
                                    For technology images can refer this{' '}
                                    <a
                                        href='https://devicon.dev/'
                                        target='_blank'
                                    >
                                        website.
                                    </a>
                                </small>
                            }
                        >
                            <Input allowClear />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col>
                        <Button type='primary' htmlType='submit'>
                            Add
                        </Button>
                    </Col>
                </Row>

                <Row className='mt-10'>
                    <Title className='!mb-0' level={4}>
                        Skills Listed:
                    </Title>
                    <Divider />
                    <Col xs={12}>
                        {skills?.map((skill: SkillsState, idx) => (
                            <Popconfirm
                                key={idx}
                                placement='topLeft'
                                title={
                                    'Are you sure you want to remove this skill?'
                                }
                                onConfirm={() => {
                                    removeSkillTag(skill._id);
                                }}
                                okText='Yes'
                                cancelText='No'
                            >
                                <Tag
                                    className='cursor-pointer'
                                    color={skillTagColors(
                                        Math.floor(Math.random() * 10) + 1
                                    )}
                                >
                                    {toTitleCase(skill.skillName)}
                                </Tag>
                            </Popconfirm>
                        ))}
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default Skills;
