
const initDB = () => {
    return new Promise(function (resolve, reject) {
        const DBOpenRequest = window.indexedDB.open("todo", 1);

        DBOpenRequest.onerror = (e) => {
            console.log('openDB/onerror, Error loading database');
            reject(e);
        };
        DBOpenRequest.onsuccess = (e) => {
            console.log('openDB/onsuccess, Database initialised');
            const DB = DBOpenRequest.result;
            resolve(DB);
        };
        DBOpenRequest.onupgradeneeded = (e) => {
            const resDb = e.target.result;

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
                console.log('Object Store/Transaction.oncomplete');
                // // Store values in the newly created objectStore.
                // const customerObjectStore = db.transaction("toDoList", "readwrite").objectStore("toDoList");
                // customerData.forEach((customer) => {
                //   customerObjectStore.add(customer);
                // });
            };

            console.log('Object store/Created.');
        };
    });
}

const createTodo = (db, todo) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["toDoList"], "readwrite");
        const objectStore = transaction.objectStore("toDoList");
        const request = objectStore.add(todo);
        request.onsuccess = (e) => {
            resolve(todo);
        }
        request.onerror = (e) => {
            reject(e);
        }
    });
}

const editTodo = (db, todo) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["toDoList"], "readwrite");
        const objectStore = transaction.objectStore("toDoList");
        const request = objectStore.get(todo.todoId);
        request.onsuccess = (e) => {

            const data = e.target.result;

            data.todoTitle = todo.todoTitle;
            data.checked = todo.checked;

            const requestUpdate = objectStore.put(data);
            requestUpdate.onerror = (e) => {
                reject(e);
            };
            requestUpdate.onsuccess = (e) => {
                console.log('requestUpdate.onsuccess', e);
                resolve(todo);
            };
        }
        request.onerror = (e) => {
            reject(e);
        }
    });
}

const getTodoAll = (db) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["toDoList"], "readwrite");
        const objectStore = transaction.objectStore("toDoList");
        const request = objectStore.getAll();
        request.onsuccess = (e) => {
            resolve(request.result);
        }
        request.onerror = (e) => {
            reject(e);
        }
    });
}

const deleteTodoCompleted = (db) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["toDoList"], "readwrite");
        const objectStore = transaction.objectStore("toDoList");
        const request = objectStore.getAll();
        request.onsuccess = (e) => {
            console.log(request.result);
            const data = request.result;
            data.forEach(item => {
                item.checked && objectStore.delete(item.todoId);
            });
            resolve('ok');
        }
        request.onerror = (e) => {
            reject(e);
        }
    });
}







const transactionOnSuccess = (e) => {
    console.log('transactionOnSuccess', e);
}
const transactionOnError = (e) => {
    console.log('transactionOnError', e);
}
const removeTodoAll = (db) => {
    const transaction = db.transaction(["toDoList"], "readwrite");
    const objectStore = transaction.objectStore("toDoList");
    const request = objectStore.clear();
    request.onsuccess = transactionOnSuccess;
    request.onerror = transactionOnError;
}

export { initDB, createTodo, editTodo, getTodoAll, deleteTodoCompleted, removeTodoAll };
