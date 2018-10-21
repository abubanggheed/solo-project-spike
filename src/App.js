import React, { Component } from 'react';
import './App.css';
import Dropzone from 'react-dropzone';
import firebase from './config';


class App extends Component {

  state = {
    uploads: [],
  }




  handleDrop = accepted => {
    const db = firebase.storage().ref();
    accepted.forEach(file => {
      const path = '/testdump/' + (+new Date()) + '-' + file.name;
      db.child(path).put(file).then(snapshot => {
        this.setState({
          uploads: [...this.state.uploads, { ...snapshot.task.location_, name: file.name }],
        });
      })
    });
  }

  handleClick = upload => {
    console.log(upload);
    const download = firebase.storage().ref(upload.path_);
    console.log(download);
    download.getDownloadURL().then(url => {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = event => {
        var blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();
    }).catch(function (error) {
      console.log('error in download:', error);
    });
  }

  getDownloads = () => {
    const db = firebase.storage();

    return [];
  }


  render() {

    return (
      <div className="App">
        <h1>dump your data</h1>
        <Dropzone onDrop={(files) => this.handleDrop(files)}></Dropzone>
        <pre>
          {this.getDownloads()}
        </pre>
        <ul>
          {this.state.uploads.map(upload => (
            <li key={upload.name}>
              {upload.name}
              <button onClick={() => this.handleClick(upload)}>Get</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
