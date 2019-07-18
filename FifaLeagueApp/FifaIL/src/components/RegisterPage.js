import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import RegisterForm from './RegisterForm';

class RegisterPage extends Component {
    render() {
        return (
            <View style={ styles.containerStyle }>
                <StatusBar
            backgroundColor="black"
            style="light-content"
            />
               <RegisterForm />
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

export default RegisterPage;
