import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  emailRFChanged, 
  passwordRFChanged, 
  confirmPasswordRFChanged, 
  registerUser, 
  //dateChanged, 
  ignChanged, 
  phoneChanged,
  nameChanged
 } from '../actions';
import {
    View,
    TextInput,
    KeyboardAvoidingView,
    Text,
    Keyboard,
    Image
  } from 'react-native';
import { Toast } from 'native-base';
import { Button, Spinner } from '../common';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker'
import logo from '../assets/Images/logo.png';

  class RegisterForm extends Component{
    componentWillMount() {
      this.setState({birthdate: ''})
    }

    onEmailChange(text) {
      this.props.emailRFChanged(text);
    }

    onNameChange(text) {
      this.props.nameChanged(text);
    }

    onPasswodChange(text) {
      this.props.passwordRFChanged(text);
    }

    onConfirmPassword(text) {
      this.props.confirmPasswordRFChanged(text);
    }
    
    // onDateChanged(text) {
    //   console.log(text);
    //   this.props.dateChanged(text);
    // }
    
    onIGNChange(text) {
      this.props.ignChanged(text);
    }
    
    onPhoneChanged(text) {
      this.props.phoneChanged(text);
    }

    onButtonPress() {
      Keyboard.dismiss();

      const { email, password, confirmPassword, fullname, ign, phone } = this.props;
      const { birthdate } = this.state;

      if (email === '' || password === '' || confirmPassword === '' || fullname === '' || ign === '' || phone === '' || birthdate === '') {
        Toast.show({
          text: 'נא למלא את כל הטופס בבקשה',
          type: 'warning',
          duration: 3000,
          buttonText: 'אחלה'
      });
        return;
      }
      
      if (phone.length <= 8){
        Toast.show({
          text: 'מספר טלפון לא חוקי!',
          type: 'warning',
          duration: 3000,
          buttonText: 'אחלה'
      })
        return;
      }

      if (password.length < 6) {
        this.props.dispatchWrong();
        Toast.show({
          text: 'סיסמא לא יכולה להיות פחות מ6 ספרות',
          type: "danger",
          duration: 3000,
          buttonText: 'אחלה'
      })
        return;
    }
      
      if (password != confirmPassword) {
        Toast.show({
          text: 'סיסמאות לא תואמות! אנא נסה שנית',
          type: 'danger',
          duration: 3000,
          buttonText: 'אחלה'
      });
        return;
      }

      this.props.registerUser({ email, password, fullname, ign, phone, birthdate });
    }

    renderButton() {
      if (this.props.loading) {
        return <Spinner size="large" />
      } else {
        return (
          <View style={styles.container}>
          <Button onPress={this.onButtonPress.bind(this)}>
          הירשם
         </Button> 
        <Button onPress={() => Actions.loginpage()}>
        <Text
          style={styles.buttonText}
          title="כניסה">
          יש לך חשבון? היכנס כאן
        </Text>
      </Button>
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
         <View style={{flexDirection: "row", justifyContent: "space-between"}}>
               <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="(WhatsApp) טלפון"
              placeholderTextColor= "grey"
             onChangeText={this.onPhoneChanged.bind(this)}
              value={this.props.phone}
              type="number"
              keyboardType="numeric"
              />
       <Text>  </Text>
<TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="שם מלא"
              placeholderTextColor= "grey"
              selectionColor="grey"
              onChangeText={this.onNameChange.bind(this)}
              value={this.props.fullname}
              /></View>
           <View style={{flexDirection: "row", justifyContent: "space-between"}}>
          <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="אימייל"
              placeholderTextColor= "grey"
              selectionColor="grey"
              keyboardType="email-address"
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
              /><Text>  </Text>
              <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="שם משתמש בקונסולה"
              placeholderTextColor= "grey"
              selectionColor="grey"
              onChangeText={this.onIGNChange.bind(this)}
              value={this.props.ign}
              /></View><View style={{flexDirection: "row", justifyContent: "space-between"}}>
          <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="הכנס שוב את הסיסמא"
              secureTextEntry={true}
              placeholderTextColor= "grey"
              onChangeText={this.onConfirmPassword.bind(this)}
              value={this.props.confirmPassword}
              /><Text>  </Text>
              <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="סיסמא"
              secureTextEntry={true}
              placeholderTextColor= "grey"
              onChangeText={this.onPasswodChange.bind(this)}
              value={this.props.password}
              />       
              </View>
              <View style={{justifyContent: 'center',  alignItems: 'center'}}>
          <DatePicker
        style={styles.datePickerStyle}
        date={this.state.birthdate}
        mode="date"
        placeholder="תאריך לידה"
        format="YYYY-MM-DD"
        minDate="1960-01-01"
        maxDate="2007-01-01"
        confirmBtnText="בחר"
        cancelBtnText="בטל"
        onDateChange={(birthdate) => {this.setState({birthdate: birthdate})}}
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {marginLeft: 36}
        }}
      /><Text>  </Text>
              </View>
              </KeyboardAvoidingView>
              {this.renderButton()}
  		</View>
			);
	}
}

const styles = {
    container: {
      justifyContent:'center',
      alignItems: 'center',
      alignSelf: 'center'
    },
    inputBox: {
      width:200,
      backgroundColor:'#ffffff',
      borderRadius: 25,
      paddingHorizontal:25,
      fontSize:15,
      color:'black',
      marginVertical: 6,
      textAlign: 'center',
      padding: 8
    },
    keyboard: {
      margin: 20,
      padding: 20,
      alignSelf: "stretch"
  },
  datePickerStyle: {
    width:200,
    backgroundColor:'#ffffff',
    borderRadius: 25,
    paddingHorizontal:6,
    marginVertical: 6,
    padding: 5,
    justifyContent: "center",
    alignItems: 'center'
    },
    logoStyle: {
      justifyContent: 'center',
     height: 200,
     width: 300,
     alignItems: 'center',
     alignSelf: 'center'
   }
}

const mapStateToProps = ({ register }) => {
  const {fullname, email, password, confirmPassword, ign, phone, loading } = register;

  return  {fullname, email, password, confirmPassword, ign, phone, loading };
};

export default connect(mapStateToProps,
   { 
     emailRFChanged, 
     passwordRFChanged, 
     confirmPasswordRFChanged, 
     registerUser, 
      nameChanged, 
      ignChanged, 
      phoneChanged 
    })(RegisterForm);