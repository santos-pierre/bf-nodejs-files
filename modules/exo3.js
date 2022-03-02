const fs = require('fs/promises');
const path = require('path');

/**
 * Give us the content of the "data/personnage.json" file as JSON object.
 *
 * @returns the list of characters in "data/personnage.json"
 */
const getCharacters = async () => {
	try {
		const data = await fs.readFile(
			path.resolve('data', 'personnage.json'),
			{
				encoding: 'utf-8',
			}
		);
		return JSON.parse(data);
	} catch (error) {
		throw error;
	}
};

/**
 * Get all the members, based on the structure of "data/personnage.json".
 *
 * @param {any} data
 * @return {Array<{"prenom": string, "nom": string, "groupe": string}>} array containing all the members.
 */
const getAllMembers = (data) => {
	/**@type {Array<{"prenom": string, "nom": string, "groupe": string}>} memberTab */
	let memberTab = [];
	for (const element of data['membre']) {
		if (element.hasOwnProperty('membre')) {
			memberTab = [...memberTab, ...getAllMembers(element)];
		} else {
			memberTab = [...memberTab, { ...element, groupe: data.groupe }];
		}
	}
	return memberTab;
};

const getAllMembers2 = (data) => {
	if (data.hasOwnProperty('membre')) {
		let memberTab = [];
		for (const element of data['membre']) {
			memberTab = [...memberTab, ...getAllMembers2(element)];
		}
		return memberTab;
	} else {
		return [data];
	}
};

/**
 * Methods that permit us to write all the characters of "data/personnage.json" into a given path.
 *
 * @param {Array<{"prenom": string, "nom": string, "groupe": string}>} data dat of all the characters in the "data/ersonnage.json" file.
 * @param {string} filePath file path where the characters will be written.
 * @return {Promise<{status: number, payload: any, message: string}>} Return an object with the status, payload and message.
 */
const writeCharacters = async (data, filePath) => {
	try {
		if (filePath.slice(filePath.length - 4) !== 'json') {
			throw new Error('Filepath must be a json');
		}
		await fs.writeFile(filePath, JSON.stringify(data, null, 4));
		return {
			status: 200,
			payload: data,
			message: `The datas were well written in ${filePath}`,
		};
	} catch (error) {
		throw error;
	}
};

/**
 * BONUS
 * Give us a new object group by property from an object array.
 *
 * @param {any} tabObject Array of object we want to group by properties.
 * @param {string} property The property of the object we want to group by.
 * @returns
 */
const groupBy = (tabObject, property) => {
	return tabObject.reduce((acc, obj) => {
		let key = obj[property];
		if (!acc[key]) {
			acc[key] = [];
		}
		acc[key].push(obj);
		return acc;
	}, {});
};

module.exports = {
	getCharacters,
	getAllMembers,
	getAllMembers2,
	writeCharacters,
	groupBy,
};
