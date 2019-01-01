import React, { Component, Fragment } from "react";

import files from "./files.json";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFiles: files.results,
      downloadFiles: [],
      countSize: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    let query = e.target.value.toLowerCase();
    let coincidences = files.results.filter(file => {
      let name = file.name.toLowerCase();

      return name.includes(query);
    })

    this.setState({
      searchFiles: coincidences
    });
  }

  handleClick(fileId) {
    let downloadFile = files.results.filter(file => file.id === fileId);
    let size = parseInt(downloadFile[0].size);
    let preventTwice = this.state.downloadFiles.every(file => file.id !== fileId);

    if(preventTwice) {
      this.setState({
        downloadFiles: [...this.state.downloadFiles, downloadFile[0]],
        countSize: this.state.countSize + size
      });
    }
  }

  render() {
    let moment = require('moment');
    return (
      <Fragment>
        <main className="home">
          <input className="search" type="search" placeholder="Search" onChange={this.handleChange} />
          <h2 className="home__title">Recent</h2>
          <ul className="file">
          {
            this.state.searchFiles.map(file => {
              return(
                <li className="file__item" key={file.id}>
                  <div className="grid grid--expanded">
                    <div className="grid">
                      <span className="file__icon">
                        <i className={`fa fa-file-${file.type}-o`}></i>
                      </span>
                      <p className="file__meta">
                        <span className="file__name">{file.name}</span> <br />
                        <span>Added {moment(file.added_at, "X").fromNow()} · {file.category}</span>
                      </p>
                    </div>
                    <button className="file__button" onClick={() => this.handleClick(file.id)}>
                      <i className="fa fa-download"></i>
                    </button>
                  </div>
                </li>
              );
            })
          }
          </ul>
        </main>

        <aside className="favorites">
          <h5>Compress</h5>
          <h6>TOTAL: {this.state.countSize} KB</h6>
          <ul className="favs">
          {
            this.state.downloadFiles.map(file => <li key={file.id}>{file.name} . {file.size}</li>)
          }
          </ul>
        </aside>
      </Fragment>
    );
  }
}

export default Home;
