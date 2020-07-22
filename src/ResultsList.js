import React, { Component } from 'react'

import PeopleList from "./PeopleList";
import GroupsList from "./GroupsList";
import FileReader from "./FileReader";

class ResultsList extends Component {
    state = {
      isFileLoaded: false
    }
    toggleFileLoaded = () => this.setState({isFileLoaded: !this.state.isFileLoaded});

    constructor(props) {
        super(props);
    }

    render() {
        return (
          <>
          <FileReader toggle_file_loaded={this.toggleFileLoaded} />
          <PeopleList is_file_loaded={this.state.isFileLoaded} />
          <GroupsList is_file_loaded={this.state.isFileLoaded} />
          </>
        );
}

}

export default ResultsList
