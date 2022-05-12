import { Col, Collapse, Row, Typography } from 'antd';
import './App.css';
import { Bio, Contact, Projects, Skill } from './components/index';

const { Title } = Typography;
const { Panel } = Collapse;

function App() {
    return (
        <Row className='px-40'>
            <Title>Portfolio CMS</Title>
            <Col xs={24}>
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
            </Col>
        </Row>
    );
}

export default App;
