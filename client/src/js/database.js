import { openDB } from 'idb';

const initdb = async () =>
	openDB('jate', 1, {
		upgrade(db) {
			if (db.objectStoreNames.contains('jate')) {
				console.log('jate database already exists');
				return;
			}
			db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
			console.log('jate database created');
		},
	});

// Update the database
export const putDb = async (content) => {
	console.log('Updating JATE db...');

	// Access the JATE database, make a transaction, then open the object store
	const jate_db = await openDB('jate', 1);
	const tx = jate_db.transaction('jate', 'readwrite');
	const store = tx.objectStore('jate');

	// Make a request with the user submitted content to the object store
	const request = store.add({ jate: content });
	const result = await request;

	console.log('Data saved to the database: ', result);
}

// Get all the content from the database
export const getDb = async () => {
	console.log('Getting JATE db...');

	// Access the JATE database, make a transaction, then open the object store
	const jate_db = await openDB('jate', 1);
	const tx = jate_db.transaction('jate', 'readonly');
	const store = tx.objectStore('jate');

	// Make a request for all content in the JATE database
	const request = store.getAll();
	const result = await request;

	console.log('Query results: ', result);
	return result;
};

initdb();
