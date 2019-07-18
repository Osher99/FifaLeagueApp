import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import { Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { getUser } from '../actions';
import { Header, Card } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CardSection, Input, Button } from '../common';
import firebase from 'firebase';
import RNExitApp from 'react-native-exit-app';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FooterHandMade from '../common/FooterHandMade';

class PlayerInfo extends Component {
    _mounted = false;

    state = {
        spinnerInfo: true,
        buttonHide: false,
        noInfoLoaded: true
    }
    componentWillUnmount () {
        this._mounted = false
        clearTimeout(this.timer);
     }

    componentDidMount() {
        this._mounted = true;
        if(this._mounted) {
        this.props.getUser();
        this.timer = setTimeout(() =>{
            this.setState({
                spinnerInfo: false
            });
            //if (typeof(this.props.playerInformartion[0]) !== 'undefined') {
            if (this.props.playerInformartion[0]) {
                this.setState({
                    noInfoLoaded: false
                });
            }
        }, 3000);
        }
}
    
    onEmailVerifyPress() {
        const { currentUser } = firebase.auth();
        console.log(currentUser.emailVerified)
        if (currentUser.emailVerified == false) {
        currentUser.sendEmailVerification().then(() =>{
            Toast.show({
                text: 'אימייל נוסף נשלח בהצלחה, אנא בדוק את תיבת הדואר שלך',
                type: 'success',
                duration: 3000,
                buttonText: 'אחלה'
            })
        if (this._mounted){
        this.setState({ buttonHide: true});
        }
        }).catch(() => 
        Toast.show({
            text: 'אופס! משהו השתבש, אנא טען מחדש את האפליקציה',
            type: 'danger',
            duration: 3000,
            buttonText: 'אחלה'
        })
        )
}
    }
    

    renderEmailVerified(){    
        const { currentUser } = firebase.auth();

        if (currentUser.emailVerified)
         {
            return (
                <Card style={{justifyContent: 'center'}}>
                <Text style={styles.textStyle}>   <Icon name="check" color="green" size={30} style={{ height: 40, width: 40, paddingLeft: 50 }}/>          </Text>
            <Text style={{justifyContent: 'center', fontSize:14}}>             האימייל שלך מאושר</Text>
            </Card>
            );
        } else {
            return (
                <Card style={{justifyContent: 'center'}}>
                <Text style={styles.textStyle}><Icon name="close" color="red" size={30} style={{ height: 40, width: 40, paddingLeft: 50 }}/>          </Text>
            <Text style={{justifyContent: 'center', fontSize:14}}> האימייל שלך עדיין לא מאושר</Text>
            <Text style={{justifyContent: 'center', fontSize:14}}> בבקשה אשר אותו בתיבת הדואר או שלח חדש</Text>
            <CardSection style={{justifyContent: 'center', paddingRight: 25}}>
            {!this.state.buttonHide ? <Button  onPress={this.onEmailVerifyPress.bind(this)}>שלח אימייל אימות נוסף</Button> : <Text style={{justifyContent: 'center', fontWeight: 'bold', color: 'green'}}>אימייל חדש נשלח בהצלחה!</Text>}
           </CardSection></Card>
            )
        }
    }

    render() {       
        
        
        if (this.state.spinnerInfo) {
            return (
                <View>
                            <StatusBar
            backgroundColor="green"
            style="light-content"
            />
                    <Header
  statusBarProps={{ barStyle: 'light-content' }}
  barStyle="light-content" // or directly
  centerComponent={{ text: 'פרופיל אישי', style: styles.headerStyle }}
  containerStyle={{
    backgroundColor: 'green',
    justifyContent: 'space-around',
  }}
/>
<Spinner
                        visible={this.state.spinnerInfo}
                        textContent={'טוען...'}
                            />
                            </View>
            )
        }
        if (this.state.noInfoLoaded) {
            return (
                <View>
                            <StatusBar
            backgroundColor="green"
            style="light-content"
            />
                    <Header
  statusBarProps={{ barStyle: 'light-content' }}
  barStyle="light-content" // or directly
  centerComponent={{ text: 'פרופיל אישי', style: styles.headerStyle }}
  containerStyle={{
    backgroundColor: 'green',
    justifyContent: 'space-around',
  }}
/>
<Text style={styles.headerInfo}>בעיית תקשורת! אנא היכנס מחדש לאפליקציה</Text>
                            </View>
            ) 
        }

        const { email, ign, phone, birthdate, fullname, allTimeInfo, tournamentInfo, rightPoints } = this.props.playerInformartion[0];
        const { totalGames, totalWins, totalLosses, totalScoredGoals, totalConcededGoals, totalTrophies  } = allTimeInfo;
        const { houseNumber, points, goalsScored, goalsConceded } = tournamentInfo;

        return (<View style={{flex: 1}}>
            <StatusBar
            backgroundColor="green"
            style="light-content"
            /><Header
            statusBarProps={{ barStyle: 'light-content' }}
            barStyle="light-content" // or directly
            centerComponent={{ text: 'פרופיל אישי', style: styles.headerStyle }}
            containerStyle={{
              backgroundColor: 'green',
              justifyContent: 'space-around',
            }}
          />
<ScrollView style={{flexGrow: 1}}>
                    <Card title={"פרטים אישיים"} containerStyle={{justifyContent: 'center'}} titleStyle={{justifyContent: 'center', fontSize: 22}}>
                    <Text style={styles.textStyle}>
                 {email}          <Icon name="envelope-o" color="green" size={30} style={{ height: 40, width: 40, paddingLeft: 50 }}/>   </Text>
                 <CardSection></CardSection>
                    <Text style={styles.textStyle}>
                 {ign}          <Icon name="gamepad" color="green" size={30} style={{ height: 40, width: 40, paddingLeft: 50 }}/>   </Text>
                 <CardSection></CardSection>
                    <Text style={styles.textStyle}>
                 {birthdate}          <Icon name="birthday-cake" color="green" size={30} style={{ height: 40, width: 40, paddingLeft: 50 }}/>   </Text>
                 <CardSection></CardSection>
                    <Text style={styles.textStyle}>
                 {fullname}          <Icon name="id-card-o" color="green" size={30} style={{ height: 40, width: 40, paddingLeft: 50 }}/>   </Text>
                 <CardSection></CardSection>
                    <Text style={styles.textStyle}>
                      {phone}          <Icon name="phone" color="green" size={30} style={{ height: 40, width: 40, paddingLeft: 50 }}/>     </Text>
                      <CardSection></CardSection>
                </Card>
                {this.renderEmailVerified()}
                    <Card title={"היסטוריית תחרויות"} containerStyle={{justifyContent: 'center'}} titleStyle={{justifyContent: 'center', fontSize: 22}}>
                            <CardSection><Input label={"כמות משחקים: " + totalGames}/></CardSection>
                            <CardSection><Input label={"כמות ניצחונות: " + totalWins}/></CardSection>
                            <CardSection><Input label={"כמות הפסדים: " +totalLosses}/></CardSection>
                            <CardSection><Input label={"כמות שערים: " +totalScoredGoals}/></CardSection>
                            <CardSection><Input label={"כמות ספיגות: " +totalConcededGoals}/></CardSection>
                            <CardSection><Input label={"יחס שערים: " +totalScoredGoals+" - "+totalConcededGoals}/></CardSection>
                            <CardSection><Input label={"כמות גביעים: " +totalTrophies}/></CardSection>
                     </Card>
                        <Card title={"תחרות אחרונה"} containerStyle={{justifyContent: 'center'}} titleStyle={{justifyContent: 'center', fontSize: 22}}>
                            <CardSection><Input label={"מספר בית: " + houseNumber}/></CardSection>
                            <CardSection><Input label={"נקודות: " + points}/></CardSection>
                            <CardSection><Input label={"כמות שערים: " +goalsScored}/></CardSection>
                            <CardSection><Input label={"כמות ספיגות: " +goalsConceded}/></CardSection>
                            <CardSection><Input label={"יחס שערים: " + goalsScored+" - "+goalsConceded}/></CardSection>
                       </Card>
                       <Card title={"נקודות זכות"} containerStyle={{justifyContent: 'center'}} titleStyle={{justifyContent: 'center', fontSize: 22}}>
                       <Card containerStyle={{justifyContent: 'center', alignItems:'center'}}>
                           <Text style={styles.labelStyle}><FontAwesome5Icon name="coins" color="green" size={30} style={{ height: 40, width: 40, paddingLeft: 50 }}/> נקודות זכות: {rightPoints} <FontAwesome5Icon name="coins" color="green" size={30} style={{ height: 40, width: 40, paddingLeft: 50 }}/></Text>
                       </Card><Card>
                           <Text style={styles.tinyTest}>הרווח נקודות זכות בכניסה לטורנירים ואוונטים מיוחדים!</Text>
                           <Text style={styles.tinyTest}>100 נקודות זכות מזכות לכניסה חינם לטורניר !</Text>
                           </Card>
                      </Card>
                      <Card>
          <CardSection style={{justifyContent: 'center'}}>
          <Button style={{paddingLeft: 15}} onPress={() => {
                       Actions.tabber({type: 'reset'});
                        Actions['editTab']({ player: this.props.playerInformartion[0]})}}>עריכת פרופיל</Button>
          </CardSection>
          <CardSection style={{justifyContent: 'center'}}>
      <Button style={{paddingRight: 15}} onPress={() => {
                       Actions.tabber({type: 'reset'});
                        Actions['editPassword']({ player: this.props.playerInformartion[0]})}}>שינוי סיסמא</Button></CardSection> 
                          <CardSection style={{justifyContent: 'center'}}>
      <Button style={{paddingRight: 15}} onPress={() =>
       {   
        Toast.show({
            text: 'להתראות!',
            type: 'success',
            duration: 3000,
            buttonText: 'אחלה'
        })
        firebase.auth().signOut();
        setTimeout(() =>  {
            RNExitApp.exitApp();
       }, 2000
    )}}>התנתק</Button></CardSection>      
                       </Card>
                       <FooterHandMade />
                </ScrollView>
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
        fontSize: 18,
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
            fontSize: 25,
            fontFamily: 'Thomba',
            color: 'black',
            textAlign: 'center',
            fontWeight: 'bold',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center'
        },
        tinyTest: {
            fontSize: 12,
            fontFamily: 'Thomba',
            fontStyle: 'italic',
            color: 'black',
            textAlign: 'center',
            fontWeight: 'bold',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center'
        }
    }

const mapStateToProps = state => {
    const playerInformartion = _.map(state.playerinformation, (val, uid) => {
        return {...val, uid };
    });
        return {playerInformartion};

};

export default connect(mapStateToProps, { getUser })(PlayerInfo);
