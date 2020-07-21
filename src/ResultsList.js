import React, { Component } from 'react'

import PeopleList from "./PeopleList";
import GroupsList from "./GroupsList";
import FileReader from "./FileReader";

class ResultsList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <>
          <PeopleList />
          <GroupsList />
          <FileReader />
          </>
        );
}

}

export default ResultsList
