import React, { Component } from 'react';
import MSDComponent from 'js/components/operations/msd/msd';
import { connect } from 'react-redux';
import Loading from 'js/components/shared/loading';
import { NOT_LOADED, LOADED } from 'js/constants';
import loadMetadataStructure from 'js/actions/operations/metadatastructure/list';

class HelpContainer extends Component {
	componentWillMount() {
		if (this.props.status !== LOADED) {
			this.props.loadMetadataStructure();
		}
	}
	render() {
		const { metadataStructure, status } = this.props;
		if (status !== LOADED)
			return <Loading textType="loading" context="operations" />;
		return <MSDComponent metadataStructure={metadataStructure} />;
	}
}

const mapStateToProps = state => {
	if (!state.operationsMetadataStructureList) {
		return {
			status: NOT_LOADED,
			metadataStructure: [],
		};
	}
	let {
		results: metadataStructure,
		status,
		err,
	} = state.operationsMetadataStructureList;

	return {
		metadataStructure,
		status,
		err,
	};
};

const mapDispatchToProps = {
	loadMetadataStructure,
};

export default connect(mapStateToProps, mapDispatchToProps)(HelpContainer);
