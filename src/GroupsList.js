import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import _ from 'lodash'

class GroupsList extends Component {
    constructor(props) {
        super(props);
        this.state = { column: null, data: [], direction: null };
    }

    componentDidMount() {
        // fetch("http://localhost:8000/api/groups")
        //   .then(response => response.json())
        //   .then(data => this.setState({ data: data.data }));
        fetch("http://localhost:8000/api/groups/members")
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
                  onClick={this.handleSort('group_name')}>Group Name</Table.HeaderCell>
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
                    if (group.members.length === 0) {
                      return (
                        <Table.Row key={index}>
                          <Table.Cell rowSpan={group.members.length}>{ group.group_name }</Table.Cell>
                          <Table.Cell></Table.Cell>
                          <Table.Cell></Table.Cell>
                          <Table.Cell></Table.Cell>
                        </Table.Row>
                      )
                    }

                    return (
                      <>
                        <Table.Row key={index}>
                          <Table.Cell rowSpan={group.members.length}>{ group.group_name }</Table.Cell>
                          <Table.Cell>{ group.members[0].first_name }</Table.Cell>
                          <Table.Cell>{ group.members[0].last_name }</Table.Cell>
                          <Table.Cell>{ group.members[0].email_address }</Table.Cell>
                        </Table.Row>
                          {
                            group.members.slice(1).map((member) => {
                              return (
                              <Table.Row>
                                <Table.Cell>{ member.first_name }</Table.Cell>
                                <Table.Cell>{ member.last_name }</Table.Cell>
                                <Table.Cell>{ member.email_address }</Table.Cell>
                              </Table.Row>
                              );
                            })
                          }
                        </>
                    );
                  })
              }

              </Table.Body>
            </Table>
    );
}

}

export default GroupsList
