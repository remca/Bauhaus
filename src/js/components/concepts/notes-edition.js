import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'react-bootstrap';
import NoteEdition from './note-edition';
import { dictionary } from 'js/utils/dictionary';
import { propTypes as notePropTypes } from 'js/utils/concepts/notes';
import { maxLengthScopeNote } from 'config/config';
import { htmlIsEmpty } from 'js/utils/html';

const noteTypes = [
  {
    rawTitle: dictionary.notes.scopeNote,
    // should be highlighted only if `scopeNoteLg1` is empty and
    //`disseminationStatus.includes('Public')`
    redFrEmpty: disseminationStatus => disseminationStatus.includes('Public'),
    noteFrName: 'scopeNoteLg1',
    noteEnName: 'scopeNoteLg2',
    maxLength: maxLengthScopeNote,
  },
  {
    rawTitle: dictionary.notes.definition,
    redFrEmpty: () => true,
    noteFrName: 'definitionLg1',
    noteEnName: 'definitionLg2',
  },

  {
    rawTitle: dictionary.notes.editorialeNote,
    noteFrName: 'editorialNoteLg1',
    noteEnName: 'editorialNoteLg2',
  },
  {
    rawTitle: dictionary.notes.changeNote,
    noteFrName: 'changeNoteLg1',
    noteEnName: 'changeNoteLg2',
  },
];
//TODO structuring data in the state to make `fr` and `en` two attributes of an
//object might be a better option to organize the code efficiently.

const handleFieldChange = handleChange =>
  noteTypes.reduce((handlers, { noteFrName, noteEnName }) => {
    handlers[noteFrName] = value => handleChange({ [noteFrName]: value });
    handlers[noteEnName] = value => handleChange({ [noteEnName]: value });
    return handlers;
  }, {});

class NotesEdition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
    this.handlers = handleFieldChange(this.props.handleChange);
    this.selectTab = tabIndex =>
      this.setState({
        activeTab: tabIndex,
      });
  }
  render() {
    const { notes, disseminationStatus } = this.props;
    const { activeTab } = this.state;
    return (
      <ul className="nav nav-tabs nav-justified">
        <Tabs defaultActiveKey={0} id="kindOfNote" onSelect={this.selectTab}>
          {noteTypes.map(
            (
              { rawTitle, noteFrName, noteEnName, redFrEmpty, maxLength },
              i
            ) => {
              const noteFr = notes[noteFrName];
              const noteEn = notes[noteEnName];
              //note fr empty and we value the `redFrEmptpy` function to know if
              //given the dissemination status, it should be highlighted or not
              let noteEdition;
              const highlight =
                redFrEmpty &&
                htmlIsEmpty(noteFr) &&
                redFrEmpty(disseminationStatus);
              const title = highlight
                ? <div className="red">
                    {rawTitle}
                  </div>
                : rawTitle;
              if (activeTab === i) {
                noteEdition = (
                  <NoteEdition
                    noteFr={noteFr}
                    noteEn={noteEn}
                    handleChangeFr={this.handlers[noteFrName]}
                    handleChangeEn={this.handlers[noteEnName]}
                    maxLength={maxLength}
                  />
                );
              }

              return (
                <Tab
                  key={noteFrName}
                  eventKey={i}
                  title={title}
                  style={{ marginTop: '20px' }}>
                  {noteEdition}
                </Tab>
              );
            }
          )}
        </Tabs>
      </ul>
    );
  }
}
NotesEdition.propTypes = {
  conceptGeneral: notePropTypes,
  disseminationStatus: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default NotesEdition;