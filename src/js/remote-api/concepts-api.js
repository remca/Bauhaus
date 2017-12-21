import { baseHostConcepts } from 'config/config';
import buildApi from './build-api';

//TODO then handler should not default to res => res.json() when no response
//body is expected.
//Change signature to (params) => [url, thenHandler, options] and pass
//json as a then handler for all GET calls
//const json = res => res.json()
//getConcepteList: () => ['concepts', json]
const api = {
	getConceptList: () => ['concepts'],
	getConceptSearchList: () => ['concepts/search'],
	getConceptValidateList: () => ['concepts/toValidate'],
	getConceptGeneral: id => [`concept/${id}`],
	getConceptLinkList: id => [`concept/${id}/links`],
	getNoteVersionList: (id, version) => [`concept/${id}/notes/${version}`],
	postConcept: concept => [
		'private/concept',
		{
			headers: {
				Accept: 'text/plain',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(concept),
		},
		res =>
			res.text(id => ({
				id,
				concept,
			})),
	],
	putConcept: (id, concept) => [
		`private/concept/${id}`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(concept),
		},
		() => {},
	],
	putConceptValidList: ids => [
		`private/concepts/validate`,
		{
			body: JSON.stringify(ids),
		},
		//do not process resspoonse
		() => {}, //TODO upgrade build apri
	],
	getConceptExport: id => [
		`concept/export/${id}`,
		{
			headers: {
				Accept: 'application/octet-stream',
				'Content-Type': 'text/plain',
			},
			responseType: 'arraybuffer',
		},
		res => res.blob(),
	],
	postConceptSend: (id, mailInfo) => [
		`private/concept/send/${id}`,
		{
			headers: {
				Accept: 'text/plain',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(mailInfo),
		},
	],
	// Collections
	getCollectionList: () => ['collections'],
	getCollectionDashboardList: () => ['collections/dashboard'],
	getCollectionValidateList: () => ['collections/toValidate'],
	postCollection: collection => [
		'private/collection',
		{
			headers: {
				Accept: 'text/plain',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(collection),
		},
		() => {},
	],
	putCollection: (id, collection) => [
		`private/collection/${id}`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(collection),
		},
		() => {},
	],
	putCollectionValidList: ids => [
		`private/collections/validate`,
		{
			body: JSON.stringify(ids),
		},
		//do not process resspoonse
		() => {}, //TODO upgrade build apri
	],
	getCollectionGeneral: id => [`collection/${id}`],
	getCollectionMembersList: id => [`collection/${id}/members`],
	getCollectionExport: id => [
		`collection/export/${id}`,
		{
			headers: {
				Accept: 'application/octet-stream',
				'Content-Type': 'text/plain',
			},
			responseType: 'arraybuffer',
		},
		res => res.blob(),
	],
	postCollectionSend: (id, mailInfo) => [
		`private/collection/send/${id}`,
		{
			headers: {
				Accept: 'text/plain',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(mailInfo),
		},
	],
};

//TODO wrap api in a proxy for developement to catch error when accessing
//an unknown function (the kind of check performed when we import something
//that has not been exported)
export default buildApi(baseHostConcepts, api);