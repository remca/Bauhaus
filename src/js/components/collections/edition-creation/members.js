import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Panel from 'js/components/shared/panel';
import Pagination from 'js/components/shared/pagination';
import Item from 'js/components/shared/picker-item';
import { filterDeburr } from 'js/utils/array-utils';
import D from 'js/i18n';
import logoAdd from 'js/components/shared/logo-add';
import logoDel from 'js/components/shared/logo-del';
import { arrayDifferenceByID } from 'js/utils/array-utils';

class CollectionMembersEdition extends Component {
	constructor(props) {
		super(props);
		const { conceptList, members } = this.props;

		this.trackPotentialsConcepts = (conceptList, memberList) => {
			const potentialList = arrayDifferenceByID(conceptList, memberList);
			return (
				potentialList &&
				potentialList.map(({ id, label }) => ({
					id,
					label,
					isAdded: false,
				}))
			);
		};
		this.trackMembers = memberList => {
			return (
				memberList &&
				memberList.map(({ id, label }) => ({
					id,
					label,
					isAdded: true,
				}))
			);
		};
		this.trackConcepts = (potentialList, memberList) => {
			return potentialList.concat(memberList);
		};

		this.state = {
			searchLabel: '',
			concepts: this.trackConcepts(
				this.trackPotentialsConcepts(conceptList, members),
				this.trackMembers(members)
			),
		};

		this.getConceptsByStatus = () => {
			const { concepts, searchLabel } = this.state;
			const check = filterDeburr(searchLabel);
			return concepts.reduce(
				(byStatus, { id, label, isAdded }) => {
					if (isAdded) byStatus.added.push({ id, label });
					else check(label) && byStatus.toAdd.push({ id, label });
					return byStatus;
				},
				{ toAdd: [], added: [] }
			);
		};

		this.handleChange = searchLabel => {
			this.setState({ searchLabel });
		};

		this.addConcept = id => {
			const { concepts } = this.state;
			const conceptsToAdd = concepts.map(concept => {
				//mutation, but not harmful here
				if (concept.id === id) concept.isAdded = true;
				return concept;
			});
			this.setState({
				concepts: conceptsToAdd,
			});
			this.props.handleChange(this.extractMembers(concepts));
		};

		this.removeConcept = id => {
			const { concepts } = this.state;
			const conceptsToDel = concepts.map(concept => {
				//mutation, but not harmful here
				if (concept.id === id) concept.isAdded = false;
				return concept;
			});
			this.setState({
				concepts: conceptsToDel,
			});
			this.props.handleChange(this.extractMembers(concepts));
		};

		this.extractMembers = concepts => {
			return concepts.reduce((members, { id, label, isAdded }) => {
				if (isAdded) members.push({ id, label });
				return members;
			}, []);
		};
	}
	render() {
		const { searchLabel } = this.state;
		const { toAdd, added } = this.getConceptsByStatus();

		const toAddEls = toAdd.map(({ id, label }) => (
			<Item
				key={id}
				id={id}
				label={label}
				logo={logoAdd}
				handleClick={this.addConcept}
			/>
		));

		const addedEls = added.map(({ id, label }) => (
			<Item
				key={id}
				id={id}
				label={label}
				logo={logoDel}
				handleClick={this.removeConcept}
			/>
		));

		return (
			<div className="row">
				<div className="col-md-6">
					<Panel title={D.collectionMembersPanelTitle}>{addedEls}</Panel>
				</div>
				<div className="col-md-6 centered">
					<input
						value={searchLabel}
						onChange={e => this.handleChange(e.target.value)}
						type="text"
						placeholder={D.searchLabelPlaceholder}
						className="form-control"
					/>
					<Pagination itemEls={toAddEls} itemsPerPage="10" context="concepts" />
				</div>
			</div>
		);
	}
}

CollectionMembersEdition.propTypes = {
	members: PropTypes.array.isRequired,
	conceptList: PropTypes.array.isRequired,
	handleChange: PropTypes.func.isRequired,
};

export default CollectionMembersEdition;
