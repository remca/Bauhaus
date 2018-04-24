import D from 'js/i18n';
import { stringToDate } from 'js/utils/moment';
import { delPTags } from 'js/utils/html';

export const buildNotes = n => [
	{
		lg1: n.definitionLg1,
		lg2: n.definitionLg2,
		title: D.classificationsDefinition,
	},
	{
		lg1: n.scopeNoteLg1,
		lg2: n.scopeNoteLg2,
		title: D.classificationsScopeNote,
	},
	{
		lg1: n.coreContentNoteLg1,
		lg2: n.coreContentNoteLg2,
		title: D.classificationsCoreContentNote,
	},
	{
		lg1: n.additionalContentNoteLg1,
		lg2: n.additionalContentNoteLg2,
		title: D.classificationsAdditionalContentNote,
	},
	{
		lg1: n.exclusionNoteLg1,
		lg2: n.exclusionNoteLg2,
		title: D.classificationsExclusionNote,
	},
	{
		lg1: n.changeNoteLg1,
		lg2: n.changeNoteLg2,
		title: D.classificationsChangeNote(
			stringToDate(delPTags(n.changeNoteDate))
		),
	},
];
