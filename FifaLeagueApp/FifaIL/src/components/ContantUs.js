import React, { Component } from 'react';
import { View, Text, ScrollView, TextInput, StatusBar } from 'react-native';
import { Toast } from 'native-base';
import { Header, Card } from 'react-native-elements';
import { CardSection, Button } from '../common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { messageChanged, sendMessage } from '../actions';
import {connect} from 'react-redux';
import { Actions } from 'react-native-router-flux';
import FooterHandMade from '../common/FooterHandMade';

class ContantUs extends Component {
    
    onMessageChanged(text) {
        this.props.messageChanged(text);
      }
    
      onMessageSend() {
    const { message } = this.props;
    const { phone, fullname, email } = this.props.player;
          if (message == '') {
            Toast.show({
              text: 'ההודעה ריקה! אנא הכנס הודעה!',
              type: "warning",
              duration: 3000,
              buttonText: 'אחלה'
          })
           return;
          }
        this.props.sendMessage({message, phone, fullname, email});
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
            centerComponent={{ text: 'צור קשר', style: styles.headerStyle }}
            containerStyle={{
              backgroundColor: 'green',
              justifyContent: 'space-around',
            }}
          />
          <ScrollView style={{flexGrow: 1}}>
              <Card title={"כתבו לנו"} containerStyle={{justifyContent: 'center'}} titleStyle={{justifyContent: 'center', fontSize: 22}}>
                  <CardSection>
                  <Text style={styles.textStyle}>{this.props.player.fullname} </Text><Text style={styles.textHStyle}>שם השולח: </Text>
                  </CardSection>
                  <CardSection>
                  <Text style={styles.textStyle}>{this.props.player.email} </Text><Text style={styles.textHStyle}>אימייל: </Text>
                  </CardSection>
                  <CardSection>
                  <Text style={styles.textStyle}>{this.props.player.phone} </Text><Text style={styles.textHStyle}>טלפון: </Text>
                  </CardSection>
                  <CardSection>
                      <TextInput
                      style={styles.inputBox} 
                      underlineColorAndroid='rgba(0,0,0,0)' 
                      placeholder="כתוב הודעה"
                      placeholderTextColor= "grey" 
                      onChangeText={this.onMessageChanged.bind(this)}
                      multiline = {true}
                      numberOfLines = {5} 
                      value={this.props.message}
                      />
                  </CardSection>
                  <CardSection style={{justifyContent: 'center'}}>
          <Button style={{paddingLeft: 15}}  onPress={this.onMessageSend.bind(this)}>שלח הודעה</Button>
          </CardSection>
              </Card>
              <Card title={"דרכים נוספות"} containerStyle={{justifyContent: 'center'}} titleStyle={{justifyContent: 'center', fontSize: 22}}>
                  <Card title="לפניות באימייל" titleStyle={{justifyContent: 'center',fontSize: 18}}>
                  <Text style={styles.textStyle}><Icon name="gmail" color="green" size={30} style={{ height: 40, width: 40, paddingLeft: 50 }}/> LeagueILFIFA@Gmail.com</Text>
                  </Card>
                  <Card title="לפניות בטלפון">
                  <Text style={styles.textStyle}><Icon name="cellphone" color="green" size={30} style={{ height: 40, width: 40, paddingLeft: 50 }}/> 052-6540414 || 050-7129820</Text>
                  </Card>
              </Card>
              <Card>
              <CardSection style={{justifyContent: 'center'}}>
          <Button style={{paddingLeft: 15}}  onPress={() => {
                         Actions.tabber({type: 'reset'});
                          Actions['agreementTab']()}}>חזרה לתפריט</Button>
          </CardSection>
              </Card>
              <FooterHandMade />
              </ScrollView>
              </View>
            );
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
  overlayLoadingContainer:{
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
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
    fontSize: 16,
    fontFamily: 'Thomba',
    color: 'black',
    textAlign: 'center',
     flexDirection: 'row',
     justifyContent: 'center',
     borderRadius: 25,
},
textHStyle: {
    fontSize: 19,
    fontFamily: 'Thomba',
    color: 'black',
    textAlign: 'right',
     fontWeight: 'bold',
     flexDirection: 'row',
     justifyContent: 'flex-end',
     borderRadius: 25,
},
inputBox: {
    width:200,
    backgroundColor:'#ffffff',
    borderRadius: 25,
    fontSize:16,
    color:'black',
    textAlign: 'center',
    paddingHorizontal:4,
    marginVertical: 4,

  },
}
const mapStateToProps = ({ contactreducer }) => {
    const { message } = contactreducer;
  
    return  { message };
  };

export default connect(mapStateToProps, { messageChanged, sendMessage })(ContantUs);
