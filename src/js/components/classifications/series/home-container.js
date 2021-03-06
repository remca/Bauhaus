import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from 'js/components/shared/loading';
import SeriesHome from './home';
import { NOT_LOADED } from 'js/constants';
import loadSeriesList from 'js/actions/classifications/series/list';

class SeriesHomeContainer extends Component {
	componentWillMount() {
		if (!this.props.series) {
			this.props.loadSeriesList();
		}
	}
	render() {
		const { series } = this.props;
		if (!series)
			return <Loading textType="loading" context="classifications" />;
		return <SeriesHome series={series} />;
	}
}

const mapStateToProps = state => {
	if (!state.classificationsSeriesList) {
		return {
			status: NOT_LOADED,
			series: [],
		};
	}
	//TODO should be sorted in the state, shouldn't they ?
	let { results: series, status, err } = state.classificationsSeriesList;

	return {
		series,
		status,
		err,
	};
};

const mapDispatchToProps = {
	loadSeriesList,
};

export default connect(mapStateToProps, mapDispatchToProps)(
	SeriesHomeContainer
);
