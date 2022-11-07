
let DB = null;

// const initDB = (setDb) => {

//     const DBOpenRequest = window.indexedDB.open("todo", 2);

//     DBOpenRequest.onerror = (e) => {
//         console.log('openDB/onerror, Error loading database', e);
//     };
//     DBOpenRequest.onsuccess = (e) => {
//         console.log('openDB/onsuccess, Database initialised', e);
//         DB = DBOpenRequest.result;
//         // setDb(DBOpenRequest.result);
//         // displayData();
//     };
//     DBOpenRequest.onupgradeneeded = (e) => {
//         const resDb = e.target.result;
//         DB = resDb;
//         // setDb(resDb);

//         resDb.onerror = (e) => {
//             console.log('onupgradeneeded / Error loading database.');
//             console.log(`Database error: ${e.target.errorCode}`);
//         };

//         const objectStore = resDb.createObjectStore('toDoList', { keyPath: 'todoId' });
//         objectStore.createIndex('todoTitle', 'todoTitle', { unique: false });
//         objectStore.createIndex('checked', 'checked', { unique: false });

//         // Use transaction oncomplete to make sure the objectStore creation is
//         // finished before adding data into it.
//         objectStore.transaction.oncomplete = (event) => {
//             console.log('objectStore.transaction.oncomplete', event);
//             // // Store values in the newly created objectStore.
//             // const customerObjectStore = db.transaction("toDoList", "readwrite").objectStore("toDoList");
//             // customerData.forEach((customer) => {
//             //   customerObjectStore.add(customer);
//             // });
//         };

//         console.log('Object store created.');
//     };
// }
const initDB = new Promise(function(resolve, reject) {
    const DBOpenRequest = window.indexedDB.open("todo", 2);

    DBOpenRequest.onerror = (e) => {
        console.log('openDB/onerror, Error loading database', e);
        reject(e);
    };
    DBOpenRequest.onsuccess = (e) => {
        console.log('openDB/onsuccess, Database initialised', e);
        DB = DBOpenRequest.result;
        resolve(DB);
    };
    DBOpenRequest.onupgradeneeded = (e) => {
        const resDb = e.target.result;
        DB = resDb;

        resDb.onerror = (e) => {
            console.log('onupgradeneeded / Error loading database.');
            console.log(`Database error: ${e.target.errorCode}`);
            reject(e);
        };

        const objectStore = resDb.createObjectStore('toDoList', { keyPath: 'todoId' });
        objectStore.createIndex('todoTitle', 'todoTitle', { unique: false });
        objectStore.createIndex('checked', 'checked', { unique: false });

        // Use transaction oncomplete to make sure the objectStore creation is
        // finished before adding data into it.
        objectStore.transaction.oncomplete = (event) => {
            console.log('objectStore.transaction.oncomplete', event);
            // // Store values in the newly created objectStore.
            // const customerObjectStore = db.transaction("toDoList", "readwrite").objectStore("toDoList");
            // customerData.forEach((customer) => {
            //   customerObjectStore.add(customer);
            // });
        };

        console.log('Object store created.');
    };
});







const transactionOnSuccess = (e) => {
    console.log('transactionOnSuccess', e);
}
const transactionOnError = (e) => {
    console.log('transactionOnError', e);
}
const createTodo = (todo) => {
    // const createTodo = (db, todo) => {
    // const transaction = db.transaction(["toDoList"], "readwrite");
    const transaction = DB.transaction(["toDoList"], "readwrite");
    const objectStore = transaction.objectStore("toDoList");
    const request = objectStore.add(todo);
    request.onsuccess = transactionOnSuccess;
    request.onerror = transactionOnError;
}


// const getTodoAll = () => {
//     if (DB) {
//         const transaction = DB.transaction(["toDoList"], "readwrite");
//         const objectStore = transaction.objectStore("toDoList");
//         const request = objectStore.getAll();
//         // request.onsuccess = transactionOnSuccess;
//         // request.onerror = transactionOnError;
//         return request;
//     }
// }

const getTodoAll = new Promise((resolve, reject) => {
    console.log('test')
    if (DB) {
        const transaction = DB.transaction(["toDoList"], "readwrite");
        const objectStore = transaction.objectStore("toDoList");
        const request = objectStore.getAll();
        request.onsuccess = (e) => {
            resolve(request.result);
        }
        request.onerror = (e) => {
            reject(e);
        }
    } else {
        reject('No DB');
    }
});

const removeTodoAll = () => {
    const transaction = DB.transaction(["toDoList"], "readwrite");
    const objectStore = transaction.objectStore("toDoList");
    const request = objectStore.clear();
    request.onsuccess = transactionOnSuccess;
    request.onerror = transactionOnError;
}




export { initDB, createTodo, getTodoAll, removeTodoAll };
