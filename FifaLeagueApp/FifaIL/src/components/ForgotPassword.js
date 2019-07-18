import React, { Component } from 'react';
import { connect } from 'react-redux';
import { emailPassRecoveyChanged, forgotPasswordAction } from '../actions';
import {
    View,
    TextInput,
    KeyboardAvoidingView,
    Text,
    Image,
    Keyboard,
    StatusBar
  } from 'react-native';
import { Toast } from 'native-base';
import { Button, Spinner } from '../common';
import { Actions } from 'react-native-router-flux';

  class ForgotPassword extends Component{

    onButtonPress() {
        Keyboard.dismiss();
        const { email } = this.props;

        if (email === '') {
          Toast.show({
            text: 'נא הכנס את כתובת האימייל שלך!',
            type: "warning",
            duration: 3000,
            buttonText: 'אחלה'
        })
            return;
        }
        this.props.forgotPasswordAction(email);
    }

    onEmailChange(text) {
      this.props.emailPassRecoveyChanged(text);
    }

    renderButton() {
      if (this.props.loading) {
        return <Spinner size="large" />
      } else {
        return (
          <Button onPress={this.onButtonPress.bind(this)}>
          אפס סיסמא
         </Button> 
        );
      }
    }
      
	render() {
		return(
            <View style={ styles.containerStyle }>
<StatusBar
            backgroundColor="black"
            style="light-content"
            />
            <Image source={{uri:
            'https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-20/images/2019/05/fifa20-logotop-teaserpage-xl.png'}}
       style={styles.logoStyle}>           
           </Image>    
          <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="אימייל"
              placeholderTextColor= "grey"
              selectionColor="grey"
              keyboardType="email-address"
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
              />
  
              {this.renderButton()}
          <Button onPress={() => Actions.loginpage()}>
          <Text
            style={styles.buttonText}
            title="כניסה"
          >
            חזרה לכניסה
          </Text>
        </Button>

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
  containerStyle: {
    flex: 1,
     justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',        
},
logoStyle: {
    justifyContent: 'center',
   height: 200,
   width: 300
}
}

const mapStateToProps = ({ passRecovery }) => {
  const { email } = passRecovery;

  return  { email };
};


export default connect(mapStateToProps, { emailPassRecoveyChanged, forgotPasswordAction })
(ForgotPassword);