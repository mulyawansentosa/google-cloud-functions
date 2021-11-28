import './App.css';
import * as React from 'react';

// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDy_yvwZ6T835ih0FSF5TiQQFha3AquCQQ",
  authDomain: "fir-auth-bd8e3.firebaseapp.com",
  projectId: "fir-auth-bd8e3",
  storageBucket: "fir-auth-bd8e3.appspot.com",
  messagingSenderId: "855733912846",
  appId: "1:855733912846:web:e4cc640f1f30d2d28bc35f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      currentUser: undefined
    };

    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
  }

  setUsername(event) {
    this.setState({username: event.target.value});
  }

  setPassword(event) {
    this.setState({password: event.target.value});
  }

  signOut() {
    let testClient = this;
    signOut(auth).then(() => {
      // Sign-out successful.
      testClient.setState({
        currentUser: undefined
      });
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  }

  createUser() {
    let testClient = this;
    createUserWithEmailAndPassword(auth, this.state.username, this.state.password)
      .then((userCredential) => {
        // Signed in 
        testClient.setState({
          currentUser: userCredential.user
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  signIn() {
    let testClient = this;
    signInWithEmailAndPassword(auth, this.state.username, this.state.password)
      .then((userCredential) => {
        // Signed in 
        testClient.setState({
          currentUser: userCredential.user
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  callApi(url, method, body) {
    var options = {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: body !== undefined ? JSON.stringify(body) : undefined
    };

    if (this.state.currentUser) {
      this.state.currentUser.getIdToken(true)
      .then(function(idToken) {
        options.headers["Authorization"] = "Bearer " + idToken;
        fetch(url, options);
      })
      .catch(error => {
        console.log(error);
      });
    } else {
      fetch(url, options);
    }
  }

  getAccountManagementForm() {
    if (this.state.currentUser === undefined) {
      return (
        <div>
          <div className="form-entry">
            Email
            <input type="text" value={this.state.username} onChange={this.setUsername} />
          </div>
          <div className="form-entry">
            Password
            <input type="password" value={this.state.password} onChange={this.setPassword} />
          </div>
          <button onClick={this.signIn.bind(this)}>Login</button>
          <button onClick={this.createUser.bind(this)}>Signup</button>
        </div>
      );
    } else {
      return (
        <button onClick={this.signOut.bind(this)}>Logout</button>
      );
    }
  }

  getApiButtons() {
    let specificResourceUrl = "http://localhost:3006/v1/drillresult/1";
    let allResourceUrl = "http://localhost:3006/v1/drillresult";
    return (
      <div>
        <button onClick={() => this.callApi(allResourceUrl, "GET")}>GET All</button>
        <button onClick={() => this.callApi(specificResourceUrl, "GET")}>GET</button>
        <button onClick={() => this.callApi(allResourceUrl, "POST", { drillId: 2, name: "My Drill 2", result: 2 })}>POST</button>
        <button onClick={() => this.callApi(specificResourceUrl, "PUT", { drillId: 2, name: "My Drill 2", result: 5 })}>PUT</button>
        <button onClick={() => this.callApi(specificResourceUrl, "DELETE")}>DELETE</button>
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.getAccountManagementForm()}
          {this.getApiButtons()}
        </header>
      </div>
    );
  }
}

export default App;
