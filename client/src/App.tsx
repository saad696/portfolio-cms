import { Col, Row, Typography } from 'antd';
import './App.css';
import { Cover } from './components/index';

const { Title } = Typography;

function App() {
    return (
        <Row className='px-40'>
            <Title>Portfolio CMS</Title>
            <Col xs={24}>
                <Cover />
            </Col>
        </Row>
    );
}

export default App;
