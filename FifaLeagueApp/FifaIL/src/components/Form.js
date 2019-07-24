import React, { Component } from 'react';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, getEmailAndPassword } from '../actions';
import {
    View,
    TextInput,
    KeyboardAvoidingView,
    Text,
    Keyboard,
    Image,
    Linking,
    TouchableOpacity
  } from 'react-native';
import { Toast } from 'native-base';
import { Button, Spinner  } from '../common';
import { Actions } from 'react-native-router-flux';
import logo from '../assets/Images/logo.png';

  class Form extends Component{

    onEmailChange(text) {
      this.props.emailChanged(text);
    }

    onPasswodChange(text) {
      this.props.passwordChanged(text);
    }

    onButtonPress() {
      Keyboard.dismiss();
      const { email, password } = this.props;

      if (email == '' || password == '') {
        Toast.show({
          text: 'נא למלא את שני השדות בבקשה!',
          type: 'warning',
          duration: 3000,
          buttonText: 'אחלה'
      })
      return;
    }

    if (password.length< 6){
      Toast.show({
        text: 'סיסמא לא חוקית!',
        type: 'warning',
        duration: 3000,
        buttonText: 'אחלה'
    })
    return;
    }
      this.props.loginUser({ email, password });
    }

    renderError() {
      if (this.props.error) {
        return (
          <View style={styles.container}>
            <Text style={styles.errorTextStyle}>
              {this.props.error}
            </Text>
          </View>
       );
      }
    }
    
    renderButton() {
      if (this.props.loading) {
        return <Spinner size="large" />
      } else {
        return (
          <View>
          <Button onPress={this.onButtonPress.bind(this)}>
          היכנס
         </Button>
                   <Button onPress={() => Actions.registerpage()}>
                   <Text
                     style={styles.buttonText}
                     title="הרשמה"
                   >
                     אין לך חשבון? הירשם כאן
                   </Text>
                 </Button>
                 <Button onPress={() => Actions.forgotpassword()}>
                   <Text
                     style={styles.buttonText}
                     title="איפוס סיסמא"
                   >
                     שכחתי סיסמה
                   </Text>
         </Button>
         <TouchableOpacity onPress={() => Linking.openURL('https://sites.google.com/view/leagueil')}>
      <Text style={styles.buttonText}>
          Privacy Policy
      </Text>
      </TouchableOpacity>
         </View>
        );
      }
    }
      
	render() {


		return(
			<View style={styles.container}>

         <KeyboardAvoidingView style={styles.keyboard}>
         <Image source={logo}
           style={styles.logoStyle} />    
          <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="אימייל"
              placeholderTextColor= "grey"
              selectionColor="grey"
              keyboardType="email-address"
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
              />
          <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="סיסמא"
              secureTextEntry={true}
              placeholderTextColor= "grey"
              onChangeText={this.onPasswodChange.bind(this)}
              value={this.props.password}
              />{this.renderButton()}
            </KeyboardAvoidingView>
          {this.renderError()}
  		</View>
			);
	}
}

const styles = {
    container: {
      justifyContent:'center',
      alignItems: 'center'
    },
  
    inputBox: {
      width:300,
      backgroundColor:'#ffffff',
      borderRadius: 25,
      paddingHorizontal:16,
      fontSize:16,
      color:'black',
      marginVertical: 10,
      textAlign: 'center'
    },
    keyboard: {
      margin: 20,
      padding: 20,
      alignSelf: "stretch"
  },
  errorTextStyle: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold'
  },
  logoStyle: {
      justifyContent: 'center',
     height: 200,
     width: 300
  },
  button: {
    width:100,
    backgroundColor:'green',
     borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13,
      textAlign: 'center'
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    textAlign:'center',
    color: 'white'
}
}

const mapStateToProps = ({auth }) => {
  const { email, password, error, loading } = auth;

  return  { email, password, error, loading };
};


export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser, getEmailAndPassword })(Form);