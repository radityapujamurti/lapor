import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import { SwitchNavigator } from 'react-navigation'

import firebase from 'react-native-firebase';

import Loading from './components/Loading'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Main from './components/Main'

const App = SwitchNavigator({Loading,SignUp,Login,Main},{initialRouteName: 'Loading'})

export default App

// export default class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       loading:true,
//     };
//   }

//   componentDidMount() {
//     this.authSubscription = firebate.auth().onAuthStateChanged((user) => {
//       this.setState({
//         loading:false,
//         user,
//       });
//     });
//   }

//   componentWillUnmount() {
//     this.authSubscription();
//   }

//   render() {
//     if (this.state.loading) return null;

//     if (this.state.user) return <LoggedIn />

//     return <LoggedOut />
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    height: 120,
    marginBottom: 16,
    marginTop: 32,
    width: 120,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  modules: {
    margin: 20,
  },
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8,
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  }
});
