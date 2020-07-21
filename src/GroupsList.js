import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'

import PeopleList from "./PeopleList";

class GroupsList extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }

    componentDidMount() {
        fetch("http://localhost:8000/api/groups")
          .then(response => response.json())
          .then(data => this.setState({ data: data.data }));
    }

    render() {
        const data = this.state.data || [];

        const panes = data.map(group => {
          return { menuItem: group.group_name, pane: <Tab.Pane key={group.id} ><PeopleList group_id={group.id} /></Tab.Pane>};
        });

        return (<Tab renderActiveOnly={false} panes={panes} />);
    }
}

export default GroupsList
