
const openDB = () => {
    let DB = null;
    const DBOpenRequest = window.indexedDB.open("todo", 2);

    DBOpenRequest.onerror = (e) => {
        console.log('openDB/onerror, Error loading database', e);
    };
    DBOpenRequest.onsuccess = (e) => {
        console.log('openDB/onsuccess, Database initialised', e);
        DB = DBOpenRequest.result;
        // setDb(DBOpenRequest.result);
        // displayData();
    };
    DBOpenRequest.onupgradeneeded = (e) => {
        const resDb = e.target.result;
        DB = resDb;
        // setDb(resDb);
    
        resDb.onerror = (e) => {
            console.log('onupgradeneeded / Error loading database.');
            console.log(`Database error: ${e.target.errorCode}`);
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

    return DB;
}






const transactionOnSuccess = (e) => {
    console.log('transactionOnSuccess', e);
}

const transactionOnError = (e) => {
    console.log('transactionOnError', e);
}

export { transactionOnSuccess, transactionOnError };
