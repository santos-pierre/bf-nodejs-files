const path = require('path');
const {
	getCharacters,
	writeCharacters,
	getAllMembers2,
	groupBy,
} = require('./modules/exo3');

console.log('NodeJS - Exo Files');

const main = async () => {
	const data = await getCharacters();
	const characters = getAllMembers2(data);
	console.log(characters);
	// console.log('Group By Test => ', groupBy(characters, 'groupe'));
	try {
		const res = await writeCharacters(
			{ nbPersonnage: characters.length, personnages: characters },
			path.resolve('data/exo3.json')
		);
		console.log(res.message);
	} catch (error) {
		console.log(error);
	}
};

main();
