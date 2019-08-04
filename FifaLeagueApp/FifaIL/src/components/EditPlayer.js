import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProfileUser, newNameChanged, newIGNChanged, newPhoneChanged, goBack } from '../actions';
import { Header, Card } from 'react-native-elements';
import { View, ScrollView, KeyboardAvoidingView, Keyboard, TextInput, StatusBar } from 'react-native';
import { Toast, Container, Content } from 'native-base';
import _ from 'lodash';
import { CardSection, Button, Spinner } from '../common';
import DatePicker from 'react-native-datepicker'
import FooterHandMade from '../common/FooterHandMade';

class EditPlayer extends Component {

    componentWillMount() {
        this.setState({birthdate: ''});
    }

      onNameChange(text) {
        this.props.newNameChanged(text);
      }
  
      onIGNChange(text) {
        this.props.newIGNChanged(text);
      }
  
      onPhoneChange(text) {
        this.props.newPhoneChanged(text);
      }
     
      onGoBack() {
        Keyboard.dismiss();
        this.props.goBack();
      }

      
    renderButton() {
        if (this.props.loading) {
          return <Spinner size="large" />
        } else {
          return (
            <View style={{flex: 1}}>
          <Card>
          <CardSection style={{justifyContent: 'center'}}>
          <Button style={{paddingLeft: 15}}  onPress={this.onSumbitEdit.bind(this)}>שמור פרטים</Button>
          </CardSection>
          <CardSection style={{justifyContent: 'center'}}>
      <Button style={{paddingRight: 15}} onPress={this.onGoBack.bind(this)}>חזור לפרטים אישיים</Button>
      </CardSection>
      </Card>
      </View>
          );
        }
      }    

      onSumbitEdit() {
        Keyboard.dismiss();

        let { fullname, ign, phone } = this.props;
        let birthdate = this.state.birthdate;

        if (phone.length <= 8 && phone.length > 0){
          Toast.show({
            text: 'מספר טלפון לא חוקי!',
            type: 'warning',
            duration: 3000,
            buttonText: 'אחלה'
        })
          return;
        }

        if (fullname == '' && ign == '' && phone == '' && this.state.birthdate == ''){
          Toast.show({
            text: 'לא הוכנסו שינוים חדשים',
            type: 'warning',
            duration: 3000,
            buttonText: 'אחלה'
        })
          return;
        }
            if (fullname == '') {
                fullname = this.props.player.fullname;
            }
            if (ign == '') {
                ign = this.props.player.ign;
            }
            if (phone == '') {
                phone = this.props.player.phone;
            }
            if (this.state.birthdate == '') {
                birthdate = this.props.player.birthdate;        
        }

        

        const {uid, tournamentInfo, allTimeInfo, email, isPaid, rightPoints, nextTour} = this.props.player;

        this.props.updateProfileUser({fullname, ign, phone, birthdate, uid, tournamentInfo, allTimeInfo, email, isPaid, rightPoints, nextTour});
      }


    render() {
        const {fullname, ign, phone, birthdate} = this.props.player;
         return (
<View style={{flex:1}}>
<StatusBar
            backgroundColor="green"
            style="light-content"
            />
<Header
  statusBarProps={{ barStyle: 'light-content' }}
  barStyle="light-content" // or directly
  centerComponent={{ text: 'עריכת פרטים', style: styles.headerStyle }}
  containerStyle={{
    backgroundColor: 'green',
    justifyContent: 'space-around',
  }}/>    
               <Container style={{justifyContent: 'center'}}>    
               <ScrollView style={{flexGrow: 1}}>    
        <KeyboardAvoidingView style={styles.keyboard}>
            <Card title={"שינוי שם מלא:"} titleStyle={styles.headerInfo}>
         <TextInput style={styles.inputBox} 
             underlineColorAndroid='rgba(0,0,0,0)' 
             placeholder={fullname}
             placeholderTextColor= "grey"
             selectionColor="grey"
             onChangeText={this.onNameChange.bind(this)}
             value={this.props.fullname}
             />
             </Card>
             <Card title={":IGN שינוי"} titleStyle={styles.headerInfo}>
         <TextInput style={styles.inputBox} 
             underlineColorAndroid='rgba(0,0,0,0)' 
             placeholder={ign}
             placeholderTextColor= "grey" 
             onChangeText={this.onIGNChange.bind(this)}
             value={this.props.ign} />
             </Card>
             <Card title={"שינוי מספר טלפון:"} titleStyle={styles.headerInfo}>
         <TextInput style={styles.inputBox} 
             underlineColorAndroid='rgba(0,0,0,0)' 
             keyboardType="numeric"
             placeholder= {phone}
             placeholderTextColor= "grey"
             onChangeText={this.onPhoneChange.bind(this)}
             value={this.props.phone}
             />
             </Card>
             <Card title={"שינוי תאריך לידה:"} titleStyle={styles.headerInfo}>
              <DatePicker
        style={styles.datePickerStyle}
        date={this.state.birthdate}
        mode="date"
        placeholder={birthdate}
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
        }}/>
             </Card>
          </KeyboardAvoidingView> 
         {this.renderButton()}
         </ScrollView>
         </Container>
         <FooterHandMade />
            </View>
        )
    }
}

const styles = {
  containerStyle: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
    headerStyle: {
        fontSize: 25,
        fontFamily: 'Thomba',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
    },
    textStyle: {
        fontSize: 20,
        fontFamily: 'Thomba',
        color: 'black',
        textAlign: 'right',
         fontWeight: 'bold',
         flexDirection: 'row',
         justifyContent: 'flex-end',
         borderRadius: 25,
    },
    labelStyle: {
        fontSize: 18,
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
        },
        datePickerStyle: {
            width:200,
          backgroundColor:'#ffffff',
          borderRadius: 25,
          padding: 5,
          justifyContent: "center",
          alignItems: 'center',
          paddingHorizontal:4,
          marginVertical: 4,
          alignSelf: 'center'
          }
    }

    const mapStateToProps = ({ edit }) => {
        const {fullname, ign, phone } = edit;
      
        return  {fullname, ign, phone };
      };
      
      export default connect(mapStateToProps,
         { 
            newNameChanged,
            newIGNChanged,
            newPhoneChanged,
            updateProfileUser,
            goBack
          })(EditPlayer);

