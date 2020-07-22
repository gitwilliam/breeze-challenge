import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import _ from 'lodash'

class PeopleList extends Component {
    constructor(props) {
        super(props);
        this.state = { column: null, data: [], direction: null };
    }

    componentDidMount() {
      this.fetchData();
    }

    componentDidUpdate(prevProps) {
      if (prevProps.is_file_loaded !== this.props.is_file_loaded) {
        this.fetchData();
      }
    }

    fetchData() {
      if (this.props.group_id) {
        fetch("http://localhost:8000/api/groups/" + this.props.group_id + "/members")
          .then(response => response.json())
          .then(data => this.setState({ data: data.data.filter(d => d.status === 'active') }));
      } else {
        fetch("http://localhost:8000/api/people")
          .then(response => response.json())
          .then(data => this.setState({ data: data.data }));
      }
    }

    handleSort = (clickedColumn) => () => {
      const { column, data, direction } = this.state

      if (column !== clickedColumn) {
        this.setState({
          column: clickedColumn,
          data: _.sortBy(data, [clickedColumn]),
          direction: 'ascending',
        })

        return
      }

      this.setState({
        data: data.reverse(),
        direction: direction === 'ascending' ? 'descending' : 'ascending',
      })
    }

    render() {
        const { column, data, direction } = this.state

        return (
            <Table celled padded sortable>
              <Table.Header>
                <Table.Row>
                <Table.HeaderCell sorted={column === 'first_name' ? direction : null}
                  onClick={this.handleSort('first_name')} singleLine>First Name</Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'last_name' ? direction : null}
                  onClick={this.handleSort('last_name')}>Last Name</Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'email_address' ? direction : null}
                  onClick={this.handleSort('email_address')}>Email</Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'status' ? direction : null}
                  onClick={this.handleSort('status')}>Status</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>

              {
                  data.map((person, index) => {
                      return (
                          <Table.Row key={index}>
                              <Table.Cell singleLine>{ person.first_name }</Table.Cell>
                              <Table.Cell singleLine>{ person.last_name }</Table.Cell>
                              <Table.Cell singleLine>{ person.email_address }</Table.Cell>
                              <Table.Cell singleLine>{ person.status }</Table.Cell>
                          </Table.Row>
                      );
                    })
              }

              </Table.Body>
            </Table>
    );
}

}

export default PeopleList
