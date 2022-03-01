const path = require('path');
const {
	getCharacters,
	getAllMembers,
	writeCharacters,
	groupBy,
} = require('./modules/exo3');

console.log('NodeJS - Exo Files');

const main = async () => {
	const data = await getCharacters();
	const characters = getAllMembers(data);
	// console.log('Group By Test => ', groupBy(characters, 'groupe'));
	try {
		const res = await writeCharacters(
			characters,
			path.resolve('data/exo3.json')
		);
		console.log(res.message);
	} catch (error) {
		console.log(error);
	}
};

main();
