import React, { Component } from 'react'
import Papa from 'papaparse'

class FileReader extends React.Component {
  constructor() {
    super();
    this.state = {
      csvfile: undefined
    };
    this.sendData = this.sendData.bind(this);
  }

  handleChange = event => {
    this.setState({
      csvfile: event.target.files[0]
    });
  };

  importCSV = () => {
    const { csvfile } = this.state;
    Papa.parse(csvfile, {
      complete: this.sendData,
      header: true
    });
  };

  sendData(result) {
      if (result.meta.fields.includes("first_name") && result.meta.fields.includes("last_name")) {
          result.data.forEach((p) => {
              fetch('http://127.0.0.1:8000/api/people/', {
                  method: 'POST',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(p)
              })
          });
      } else if (result.meta.fields.includes("group_name") && !result.meta.fields.includes("first_name")) {
          result.data.forEach((p) => {
              fetch('http://127.0.0.1:8000/api/groups/', {
                  method: 'POST',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(p)
              })
          });
      }
  }

  render() {
    console.log(this.state.csvfile);
    return (
      <div className="App">
        <h2>Import User or Group CSV file</h2>
        <input
          className="csv-input"
          type="file"
          ref={input => {
            this.filesInput = input;
          }}
          name="file"
          placeholder={null}
          onChange={this.handleChange}
        />
        <p />
        <button onClick={this.importCSV}> Upload</button>
      </div>
    );
  }
}

export default FileReader;