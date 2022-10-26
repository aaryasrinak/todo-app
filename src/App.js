import './App.scss';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

function App() {
  return (

    <Container fluid="xs" className="bg-dark">
      <Row>
        <Col>1 of 1</Col>
      </Row>

      <Stack gap={3} className="col-md-5 mx-auto">
        <div className="bg-light border">First item</div>
        <div className="bg-light border ms-auto">Second item</div>
        <div className="vr" />
        <div className="bg-light border">Third item</div>
        <Button variant="primary">Primary</Button>{' '}
      </Stack>
    </Container>


  );
}

export default App;
