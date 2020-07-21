import React, { Component } from 'react'

import PeopleList from "./PeopleList";
import Dropzone from "./Dropzone";
import FileReader from "./FileReader";

class ResultsList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <>
          <PeopleList />
          <Dropzone />
          <FileReader />
          </>
        );
}

}

export default ResultsList
