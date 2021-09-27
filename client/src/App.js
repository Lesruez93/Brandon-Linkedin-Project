import "./App.css";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";

import React, { Component } from "react";

import Alert from "react-s-alert";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import ProfileCard from "./components/ProfileCard";
import _ from 'lodash';
var axios = require("axios").default;




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorized: false,
      firstName: null,
      lastName: null,
      profileURL: null,
      pictureURL: null,
      data:null
    };
  }

  componentDidMount() {
    window.addEventListener('message', this.handlePostMessage);
  }

  handlePostMessage = (event) => {
    if (event.data.type === "profile") {
      this.updateProfile(event.data.profile);
      Alert.success(`Login successful: ${event.data.profile.localizedFirstName}`,{position:'top'});
    }
  };


  queryMoreDetails = (publicIdentifier) => {
    let  options = {
      method: 'POST',
      url: 'http://localhost:3001/callback/user',
      body: {
        'i': publicIdentifier,
      }
    };
    axios.request(options).then( (response)=> {
      console.log(response.data);
      localStorage.setItem('user',JSON.stringify(response))

      // this.setState({data: response.data});

    }).catch(function (error) {
      console.error(error);
    });

  }

  updateProfile = (profile) => {
    console.log(profile)
      this.setState({
        isAuthorized: true,
        firstName: _.get(profile,'localizedFirstName',''),
        lastName: _.get(profile,'localizedLastName',''),
        profileURL: `https://www.linkedin.com/in/${_.get(profile,'vanityName','')}`,
        pictureURL: _.get(_.last(_.get(profile,'profilePicture.displayImage~.elements','')),'identifiers[0].identifier','')
      })
    this.requestsDetails(profile)
  }

  requestProfile = () => {
    var oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&scope=r_liteprofile&r_basicprofile&r_emailaddress
&state=123456&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`
    var width = 450,
      height = 730,
      left = window.screen.width / 2 - width / 2,
      top = window.screen.height / 2 - height / 2;

    window.open(
      oauthUrl,
      "Linkedin",
      "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
        width +
        ", height=" +
        height +
        ", top=" +
        top +
        ", left=" +
        left
    );
  };

  requestsDetails(profile){
  let  options = {
      method: 'GET',
      url: 'https://linkedin9.p.rapidapi.com/search_people',
      params: {keywords: this.state.firstName + ' ' + this.state.lastName},
      headers: {
        'x-rapidapi-host': 'linkedin9.p.rapidapi.com',
        'x-rapidapi-key': 'a70a0f84e5msh225bf5f17660a4bp1729ecjsn6e0199ba94c8'
      }
    };
    axios.request(options).then( (response)=> {

      this.queryMoreDetails(response.data[0].publicIdentifier)

     // this.setState({data: response.data});
    }).catch(function (error) {
      console.error(error);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Linkedin Login</h1>
          <p className="App-intro">Brandon demo page for Linkedin login</p>

          <Alert />
        </header>
        <div className="App-body">
          {!this.state.isAuthorized && <button onClick={this.requestProfile}>Linkedin Login</button>}
          {this.state.isAuthorized &&
            (
              <ProfileCard
                firstName={this.state.firstName}
                lastName={this.state.lastName}
                profileURL={this.state.profileURL}
                pictureURL={this.state.pictureURL}
              />
            )}
        </div>
      </div>
    );
  }
}

export default App;
