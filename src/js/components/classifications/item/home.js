import React, { Component } from 'react';
import CheckSecondLang from 'js/components/shared/second-lang-checkbox';
import PageTitle from 'js/components/shared/page-title';
import PageSubtitle from 'js/components/shared/page-subtitle';
import Controls from './controls';
import General from './general';
import Notes from './notes';
import Narrowers from './narrowers';

class ItemVisualization extends Component {
	render() {
		const {
			item: { general, notes, narrowers },
			secondLang,
			langs,
		} = this.props;
		const { classificationId, itemId, conceptVersion: version } = general;
		return (
			<div className="container">
				<CheckSecondLang
					secondLang={secondLang}
					onChange={this.props.saveSecondLang}
				/>
				<PageTitle title={general.prefLabelLg1} context="classifications" />
				{secondLang &&
					general.prefLabelLg2 && (
						<PageSubtitle
							subTitle={general.prefLabelLg2}
							context="classifications"
						/>
					)}
				<Controls
					classificationId={classificationId}
					itemId={itemId}
					version={version}
				/>
				<General
					general={general}
					classificationId={classificationId}
					itemId={itemId}
					secondLang={secondLang}
				/>
				{notes && <Notes secondLang={secondLang} notes={notes} langs={langs} />}
				{narrowers.length !== 0 && (
					<Narrowers
						narrowers={narrowers}
						classificationId={classificationId}
						secondLang={secondLang}
					/>
				)}
			</div>
		);
	}
}

export default ItemVisualization;
