import React, { Component } from 'react';
import './App.css';
import Dropzone from 'react-dropzone';
import firebase from './config';


class App extends Component {

  state = {
    uploads: [],
    activeDownload: '',
  }




  handleDrop = accepted => {
    const db = firebase.storage().ref();
    accepted.forEach(file => {
      const path = '/testdump/' + (+new Date()) + '-' + file.name;
      db.child(path).put(file).then(snapshot => {
        //snapshot is some information reguarding the path to the new upload
        this.setState({
          ...this.state,
          uploads: [...this.state.uploads, { ...snapshot.task.location_, name: file.name }],
        });
      })
    });
  }

  handleClick = upload => {
    console.log(upload);
    const download = firebase.storage().ref(upload.path_);
    //download is the reference to the storage database
    console.log(download);
    //this next part was coppied from documentation
    download.getDownloadURL().then(url => {
      let xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = event => {
        let blob = xhr.response;
        console.log(blob);
      };
      xhr.open('GET', url);
      xhr.send();
      this.setState({
        ...this.state,
        activeDownload: url,
      });
    }).catch(function (error) {
      console.log('error in download:', error);
    });
  }


  render() {

    return (
      <div className="App">
        <h1>dump your data</h1>
        <Dropzone onDrop={(files) => this.handleDrop(files)}></Dropzone>
        <ul>
          {this.state.uploads.map(upload => (
            <li key={upload.name}>
              {upload.name}
              <button onClick={() => this.handleClick(upload)}>Get</button>
            </li>
          ))}
        </ul>
        <img src={this.activeDownload} alt=""/>
      </div>
    );
  }
}

export default App;
