import './App.scss';

import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

function App() {
  return (
    <>
      <Stack className="bg-dark-vvd-grayish-blue">
        <Image src="bg-desktop-dark.jpg" />
        <Stack gap={3} className="w-50 mx-auto">
          <p className="h2 fw-bold text-white">T O D O</p>
          <div className="bg-light border">First item</div>
          <div className="bg-light border ms-auto">Second item</div>
          <div className="vr" />
          <div className="bg-light border lh-1">TEst</div>
          <Button className="lh-1 bg-light-d-grayish-blue">Primary</Button>{' '}
        </Stack>
      </Stack>
    </>
  );
}

export default App;
