import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import _ from 'lodash'

class GroupsList extends Component {
    constructor(props) {
        super(props);
        this.state = { column: null, data: [], direction: null };
    }

    componentDidMount() {
        fetch("http://localhost:8000/api/groups")
          .then(response => response.json())
          .then(data => this.setState({ data: data.data }));
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
            <Table celled sortable structured>
              <Table.Header>
                <Table.Row>
                <Table.HeaderCell sorted={column === 'group_name' ? direction : null}
                  onClick={this.handleSort('group_name')} rowSpan='2'>Group Name</Table.HeaderCell>
                <Table.HeaderCell colSpan='3'>People</Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                <Table.HeaderCell sorted={column === 'first_name' ? direction : null}
                  onClick={this.handleSort('first_name')}>First Name</Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'last_name' ? direction : null}
                  onClick={this.handleSort('last_name')}>Last Name</Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'email_address' ? direction : null}
                  onClick={this.handleSort('email_address')}>Email</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>

              {
                  data.map((group, index) => {
                      return (
                        <>
                          <Table.Row key={index}>
                            <Table.Cell rowSpan='3'>{ group.group_name }</Table.Cell>
                            <Table.Cell>A</Table.Cell>
                            <Table.Cell>The Builder</Table.Cell>
                            <Table.Cell>bob@bob.com</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>C</Table.Cell>
                            <Table.Cell>The Builder</Table.Cell>
                            <Table.Cell>bob@bob.com</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>E</Table.Cell>
                            <Table.Cell>The Builder</Table.Cell>
                            <Table.Cell>bob@bob.com</Table.Cell>
                          </Table.Row>
                          </>
                          // <Table.Row key={index}>
                          //     <Table.Cell singleLine>{ person.first_name }</Table.Cell>
                          //     <Table.Cell singleLine>{ person.last_name }</Table.Cell>
                          //     <Table.Cell singleLine>{ person.email_address }</Table.Cell>
                          //     <Table.Cell singleLine>{ person.status }</Table.Cell>
                          // </Table.Row>
                      );
                    })
              }

              </Table.Body>
            </Table>
    );
}

}

export default GroupsList
