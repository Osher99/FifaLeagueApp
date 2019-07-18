import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import Form from './Form';
import Spinner from 'react-native-loading-spinner-overlay';

class LoginPage extends Component {
    state = {
        spinnerLogin: true
        };
  
    _mounted = false;
    componentWillUnmount () {
        this._mounted = false;
        clearTimeout(this.timer);
     }
     
    componentDidMount() {
        this._mounted = true;
        if(this._mounted) {
        this.timer = setTimeout(() =>{
            this.setState({
              spinnerLogin: false
                });
        }, 2000);
    }
  }
    render() {
        if (this.state.spinnerLogin) {
            return (
            <View style={styles.containerStyle}>
              <Spinner
                              visible={this.state.spinnerLogin}
                              textContent={'טוען...'}
                              color='white'
                                  />
              </View>
            )
          }
      
        return (
            <View style={ styles.containerStyle }>   
            <StatusBar
            backgroundColor="black"
            style="light-content"
            />    
               <Form />
               </View>
        );
    }
}
const styles = {
    containerStyle: {
        flex: 1,
         justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',        
    }
}

export default LoginPage;
