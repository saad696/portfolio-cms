import React from 'react';
import { Collapse } from 'antd';
import { Bio, Skill, Projects, Contact } from '../index';

const { Panel } = Collapse;
const Cover = () => {
    return (
        <>
            <Collapse defaultActiveKey={['1']}>
                <Panel header='Manage Bio' key='1'>
                    <Bio />
                </Panel>
                <Panel header='Manage Skills' key='2'>
                    <Skill />
                </Panel>
                <Panel header='Manage Projects' key='3'>
                    <Projects />
                </Panel>
                <Panel header='Manage Contact' key='4'>
                    <Contact />
                </Panel>
            </Collapse>
        </>
    );
};

export default Cover;
