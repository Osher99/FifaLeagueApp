import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePass, oldPasswordChanged, newPasswordChanged, confirmNewPasswordChanged, goBack, dispatchWrong } from '../actions';
import { Header, Card } from 'react-native-elements';
import { View, ScrollView, KeyboardAvoidingView, Keyboard, TextInput, StatusBar } from 'react-native';
import { Toast, Container, Content } from 'native-base';
import _ from 'lodash';
import { CardSection, Button, Spinner } from '../common';
import FooterHandMade from '../common/FooterHandMade';

class EditPlayerPassword extends Component {

      onOldPWChange(text) {
        this.props.oldPasswordChanged(text);
      }
  
      onNewPWChange(text) {
        this.props.newPasswordChanged(text);
      }
  
      onNewConfirmPWChange(text) {
        this.props.confirmNewPasswordChanged(text);
      }

      onSubmit() {
        Keyboard.dismiss();

          const {oldPassword, newPassword, confirmNewPassword} = this.props;

          if (newPassword.length < 6) {
            this.props.dispatchWrong();
            Toast.show({
              text: 'סיסמא לא יכולה להיות פחות מ6 ספרות',
              type: "danger",
              duration: 3000,
              buttonText: 'אחלה'
          })
            return;
        }
          if (newPassword != confirmNewPassword){
              this.props.dispatchWrong();
              Toast.show({
                text: 'סיסמאות חדשות לא זהות!',
                type: "danger",
                duration: 3000,
                buttonText: 'אחלה'
            })
              return;
          }
          this.props.changePass({oldPassword, newPassword});
      }

      onGoBack() {
        Keyboard.dismiss();
        this.props.goBack();
      }

    render() {
        return (
            <View style={{flex: 1}}>
                      <StatusBar
            backgroundColor="green"
            style="light-content"
            />
           <Header
  statusBarProps={{ barStyle: 'light-content' }}
  barStyle="light-content" // or directly
  centerComponent={{ text: 'שינוי סיסמא', style: styles.headerStyle }}
  containerStyle={{
    backgroundColor: 'green',
    justifyContent: 'space-around',
  }}
/>         
<Container style={{justifyContent: 'center'}}>
<ScrollView style={{flexGrow: 1}}>
<KeyboardAvoidingView style={styles.keyboard}>

            <Card title={"סיסמא נוכחית:"} titleStyle={styles.headerInfo}>
         <TextInput style={styles.inputBox} 
           underlineColorAndroid='rgba(0,0,0,0)' 
           placeholder="סיסמא נוכחית"
           secureTextEntry={true}
           placeholderTextColor= "grey"
           onChangeText={this.onOldPWChange.bind(this)}
           value={this.props.confirmPassword}
             />
             </Card>
             <Card title={"סיסמא חדשה:"} titleStyle={styles.headerInfo}>
         <TextInput style={styles.inputBox} 
         underlineColorAndroid='rgba(0,0,0,0)' 
         placeholder="הכנס סיסמא חדשה"
         secureTextEntry={true}
         placeholderTextColor= "grey"
         onChangeText={this.onNewPWChange.bind(this)}
         value={this.props.confirmPassword} />
             </Card>
             <Card title={"אישור סיסמא חדשה:"} titleStyle={styles.headerInfo}>
         <TextInput style={styles.inputBox} 
         underlineColorAndroid='rgba(0,0,0,0)' 
         placeholder="הכנס שוב את הסיסמא"
         secureTextEntry={true}
         placeholderTextColor= "grey"
         onChangeText={this.onNewConfirmPWChange.bind(this)}
         value={this.props.confirmPassword}
             />
             </Card>
             </KeyboardAvoidingView>
             <View style={{flex: 1}}>
             <Card>
        <CardSection style={{justifyContent: 'center'}}>
          <Button style={{paddingLeft: 15}}  onPress={this.onSubmit.bind(this)}>שמור פרטים</Button>
          </CardSection>
          <CardSection style={{justifyContent: 'center'}}>
      <Button style={{paddingRight: 15}} onPress={this.onGoBack.bind(this)}>חזור לפרטים אישיים</Button>
      </CardSection>
      </Card>
      </View>
      </ScrollView>
      </Container>
      <FooterHandMade />
            </View>
        )
    }
}

const styles = {
    headerStyle: {
        fontSize: 25,
        fontFamily: 'Thomba',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
    },
    textStyle: {
        fontSize: 16,
        fontFamily: 'Thomba',
        color: 'black',
        textAlign: 'right',
         fontWeight: 'bold',
         flexDirection: 'row',
         justifyContent: 'flex-end',
         borderRadius: 25,
    },
    labelStyle: {
        fontSize: 15,
        fontFamily: 'Thomba',
        color: 'black',
        textAlign: 'left',
        fontWeight: 'bold',
        borderRadius: 25,
    },
        hr: {
            backgroundColor: 'black', 
            height: 1
        },
        tourInfoStyle: {
            fontSize: 15,
            fontFamily: 'Thomba',
            color: 'black',
            textAlign: 'right',
             flexDirection: 'row',
             justifyContent: 'flex-end'
        },
        headerInfo: {
            fontSize: 18,
            fontFamily: 'Thomba',
            color: 'black',
            textAlign: 'center',
            fontWeight: 'bold',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center'
        } ,
        inputBox: {
          backgroundColor:'#ffffff',
          borderRadius: 25,
          fontSize:16,
          color:'black',
          textAlign: 'center',
          paddingHorizontal:4,
          marginVertical: 4,
          alignSelf: 'center',
          justifyContent: 'center',
          height: 50
        },
          keyboard: {
            margin: 20,
            padding: 20,
            alignSelf: "stretch"

          }
    }
    const mapStateToProps = ({ editpassword }) => {
        
        const { oldPassword, newPassword, confirmNewPassword } = editpassword;

        return { oldPassword, newPassword, confirmNewPassword };
       
     };
      
    export default connect(mapStateToProps,{ oldPasswordChanged, newPasswordChanged, confirmNewPasswordChanged, changePass, goBack, dispatchWrong })(EditPlayerPassword);
