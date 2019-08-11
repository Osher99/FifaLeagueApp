import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from '../reducers'
import Router from './Router';
import { YellowBox, StatusBar } from 'react-native';
import _ from 'lodash';
import SplashScreen from 'react-native-splash-screen';
import { Actions } from 'react-native-router-flux';
import { config } from '../fbConfig/firebaseSettings';
class App extends Component {

    componentDidMount() {
        SplashScreen.hide();
    }
    componentWillMount() {
        console.log(config)
      firebase.initializeApp(config);
      firebase.auth().onAuthStateChanged(user => {
        if (user){
        Actions.tabber({type: 'reset'});
        Actions['tab1']();
        }
    })
      
}

    render() {
        YellowBox.ignoreWarnings(['ListView is deprecated']);
        YellowBox.ignoreWarnings(['Setting a timer']);
        
        const _console = _.clone(console);
        console.warn = message => {
             if (message.indexOf('Setting a timer') <= -1) {
                 _console.warn(message);
                }
            };
            
        return (
           
            <Provider 
                store={createStore(
                reducers,
                {},
                applyMiddleware(ReduxThunk))
                }>
       <Router />
       </Provider>
        );
    };
};

export default App;