import './App.scss';

import { useContext, useEffect, useState } from 'react';
import { ColorModeContext } from './contexts/ColorModeContext';

import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';

// import Button from 'react-bootstrap/Button';

import Todo from './components/todo';

import { transactionOnSuccess, transactionOnError } from './libs/indexedDB';

// SVG Icon from
// https://icons.getbootstrap.com/#usage

function App() {
  const { colorMode, setColorMode } = useContext(ColorModeContext);
  const [db, setDb] = useState(null);
  const [metadata, setMetadata] = useState([]);

  useEffect(() => {


  }, []);

  useEffect(() => {
    if (colorMode === "light") {
      document.body.style.backgroundColor = "#e4e5f1";
    } else {
      document.body.style.backgroundColor = "#161722";
    }
  }, [colorMode]);

  const editTodo = (id, todo) => {
    if (id) {
      console.log(`todo: ${id} ${todo}`);
    } else {
      const transaction = db.transaction(["toDoList"], "readwrite");
      const objectStore = transaction.objectStore("toDoList");
      const request = objectStore.add({ todoId: Date.now(), todoTitle: todo, checked: false });
      request.onsuccess = transactionOnSuccess;
      request.onerror = transactionOnError;
    }
  }

  const clearComplete = () => {

  }
  
  return (
    <div className={colorMode === "light" ? "lightmode" : "darkmode"}>
      <Stack className="main">
        {colorMode === "light" ?
          <>
            <Image src="bg-mobile-light.jpg" className="d-xs-none" />
            <Image src="bg-desktop-light.jpg" className="d-none d-xs-inline-block" />
          </>
          :
          <>
            <Image src="bg-mobile-dark.jpg" className="d-xs-none" />
            <Image src="bg-desktop-dark.jpg" className="d-none d-xs-inline-block" />
          </>
        }


        <div className="position-absolute w-100 mt-5">
          <Stack gap={4} className="w-50 mx-auto">
            <div className="d-flex flex-row justify-content-between align-content-center">
              <div className="fs-2 fw-bold text-vl-gray">T O D O</div>
              {colorMode === "light" ?
                <svg onClick={() => setColorMode("dark")}
                  className="bi bi-moon-fill mt-1 text-vl-gray hover-pointer" width="32" height="32"
                  viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                >
                  <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
                </svg>
                :
                <svg onClick={() => setColorMode("light")}
                  className="bi bi-sun-fill mt-1 text-vl-gray hover-pointer" width="36" height="36"
                  viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                >
                  <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                </svg>
              }
            </div>

            <Todo roundedTop roundedBottom editTodo={editTodo} />

            <Stack>
              <Todo roundedTop />
              <Todo borderTop />
              <Todo borderTop />
              <Todo borderTop />
              <div className="bottom-bar border-top-gray d-flex flex-row justify-content-between align-content-center rounded-bottom">
                <div >
                  0 items left
                </div>
                <div className="bottom-bar-filter d-flex flex-row gap-3">
                  <div>All</div>
                  <div>Active</div>
                  <div>Completed</div>
                </div>
                <div role="button" className="cursor-pointer"
                  onClick={() => {console.log('ccc')}}
                >
                  Clear Completed
                </div>
              </div>
            </Stack>

            <div className="bottom-text mt-4 mx-auto">
              Drag and drop to reorder list
            </div>

          </Stack>
        </div>



      </Stack>
    </div>
  );
}

export default App;
