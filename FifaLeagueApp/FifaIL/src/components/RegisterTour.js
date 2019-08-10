import React, { Component } from 'react';
import { View, ScrollView, StatusBar, Image, Linking, } from 'react-native';
import { Header, Card } from 'react-native-elements';
import { CardSection, Button } from '../common';
import { Container, Content, ListItem, Text, Toast} from "native-base";
import Icon from 'react-native-vector-icons/Zocial';
import { registerTourAction, fetchToursAction } from '../actions';
import {connect} from 'react-redux';
import { Actions } from 'react-native-router-flux';
import FooterHandMade from '../common/FooterHandMade';
import Spinner from 'react-native-loading-spinner-overlay';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import CompleteFlatList from 'react-native-complete-flatlist';

class RegisterTour extends Component {
  state = {
    spinnerTours: true,
    noInfoLoaded: true
};
componentWillUnmount () {
  this._mounted = false
  clearTimeout(this.timer);
}
componentDidMount() {
  if (this.props.player && this.props.tours) {
    this.setState({
      noInfoLoaded: false
    });
}
  this._mounted = true;
  if(this._mounted) {
    this.props.fetchToursAction();
  this.timer = setTimeout(() =>{
      this.setState({
        spinnerTours: false,
      }); 
      if (this.props.player) {
          this.setState({
            noInfoLoaded: false
          });

      }
  }, 3000);
}
}
payPalPress() {
    if (this.props.tours.tours[0].paypalmethod == "undefined") {
        Toast.show({
            text: 'בעיות חיבור נא להיכנס מחדש לאפליקציה!',
            type: 'danger',
            duration: 3000,
            buttonText: 'אחלה'
        })
        return;
    }
    console.log(this.props.tours.tours[0])
    Linking.openURL(this.props.tours.tours[0].paypalmethod);
}

phonePress() {
    if (this.props.tours.tours[0].phonemethod == "undefined") {
        Toast.show({
            text: 'בעיות חיבור נא להיכנס מחדש לאפליקציה!',
            type: 'danger',
            duration: 3000,
            buttonText: 'אחלה'
        })
        return;
    }       
     Linking.openURL(`tel:${this.props.tours.tours[0].phonemethod}`);
}


bitPress() {
    if (this.props.tours.tours[0].bitmethod == "undefined") {
        Toast.show({
            text: 'בעיות חיבור נא להיכנס מחדש לאפליקציה!',
            type: 'danger',
            duration: 3000,
            buttonText: 'אחלה'
        })
        return;
    }       
     Linking.openURL(this.props.tours.tours[0].bitmethod);
}

onTourRegister(thisconsole) {                
    let nextTour = true;
    const {fullname, ign, phone, birthdate, uid, tournamentInfo, allTimeInfo, email, isPaid, rightPoints} = this.props.player;
     this.props.registerTourAction({fullname, ign, phone, birthdate, uid, tournamentInfo, allTimeInfo, email, isPaid, rightPoints, nextTour, thisconsole});
}

renderButton(flag, isRegistered, thisconsole) {
    if (flag && !isRegistered) {
        return (
            <CardSection>
            <Button style={{paddingLeft: 15}} onPress={() => {this.onTourRegister(thisconsole)
            }}>הירשם לטורניר!</Button>
            </CardSection>
        )
    }
    if (isRegistered) {
        return (
            <CardSection>
            <Text style={styles.headerTextStyle}>נרשמת כבר לטורניר זה או אחר, אנא התעדכן בקבוצת הWhatsApp</Text>
           </CardSection>
        )
    }
       return (
            <CardSection>
             <Text style={styles.headerTextStyle}>טורניר מלא!</Text>
            </CardSection>
        )
}

renderFree(flag, flag2, price) {
    if (!flag && flag2) {
        return (
            <Card>
            <CardSection>
             <Text style={styles.headerTextStyle}>טורניר זה בעלות {price} אנא הסדירו תשלום באחד מהאמצעים הבאים:</Text>
            </CardSection>
            <CardSection style={{justifyContent: 'center'}}>
              <Button  style={{paddingRight: 15}}  onPress={this.payPalPress.bind(this)}>
                  שלם באמצעות <Icon name="paypal" color="black" size={30} style={{ height: 40, width: 40, paddingLeft: 50 }}/>   PayPal  </Button>
              </CardSection>
              <CardSection style={{justifyContent: 'center'}}>
              <Button  style={{paddingRight: 15}}  onPress={this.phonePress.bind(this)}>       העברה בנקאית   <Icon name="call" color="black" size={30} style={{ height: 40, width: 40, paddingLeft: 50 }}/> </Button>
              </CardSection>
              <CardSection style={{justifyContent: 'center'}}>
              <Button  style={{paddingRight: 15}}  onPress={this.bitPress.bind(this)}>
                  שלם באמצעות <FontAwesomeIcon name="send" color="black" size={30} style={{ height: 40, width: 40, paddingLeft: 50 }}/>         Bit  </Button>
              </CardSection>
            </Card>
        )
    }
       return (
            <CardSection>
             <Text style={styles.textStyleBig}>טורניר זה חינמי לחלוטין!</Text>
            </CardSection>
        )
}

renderItem = (item)  => {
    return (
        <View key={item.id} style={{ flex: 1, justifyContent: 'center', alignItems:'center'}}>
            <ListItem itemHeader>
            <Card>
            <CardSection>
            <Image style={styles.imageStyle} source={{ uri: item.tourImage }} />
        </CardSection>
        <CardSection>
            <View style={styles.headerContentStyle}>
            <Text style={styles.textStyleBig}>טורניר {item.tourGame}</Text>
            <Text style={styles.textStyleBig}> בקונסולת ה{item.console}</Text>
        </View>
        </CardSection>
        <CardSection>
        <Text style={styles.textStyle}>{item.tourDate}</Text>
        </CardSection>
            {this.renderFree(item.isFree, item.isAvailable, item.price)}
        <ScrollView style={{flexGrow: 1}}>
            <CardSection>
            <Text style={styles.textStyle}>מספר משתתפים: {item.numberOfPlayers}</Text>
            </CardSection>
            <CardSection>
            <Text style={styles.textStyle}>נרשמו: <Text style={styles.redtextStyle}>{item.numberofRegistered}</Text></Text>
            </CardSection>
            {this.renderButton(item.isAvailable, this.props.player.nextTour, item.console)}
         </ScrollView>
    </Card>
     </ListItem>
  </View>
    );
  }

    render() {
     
      if (this.state.spinnerTours) {
        return (
            <View>
                 <StatusBar
        backgroundColor="green"
        style="light-content"
        />
                <Header
statusBarProps={{ barStyle: 'light-content' }}
barStyle="light-content" // or directly
centerComponent={{ text: 'הרשמה לטורניר', style: styles.headerStyle }}
containerStyle={{
backgroundColor: 'green',
justifyContent: 'space-around',
}}
/>
<Spinner
                    visible={this.state.spinnerTours}
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
centerComponent={{ text: 'הרשמה לטורניר', style: styles.headerStyle }}
containerStyle={{
backgroundColor: 'green',
justifyContent: 'space-around',
}}
/>
<Text style={styles.headerInfo}>בעיית תקשורת! אנא היכנס מחדש לאפליקציה</Text>
                        </View>
        ) 
    }
        return (
            <View style={{flex: 1}}>
                      <StatusBar
            backgroundColor="green"
            style="light-content"
            />
              <Header
            statusBarProps={{ barStyle: 'light-content' }}
            barStyle="light-content" // or directly
            centerComponent={{ text: 'הרשמה לטורניר', style: styles.headerStyle }}
            containerStyle={{
              backgroundColor: 'green',
              justifyContent: 'space-around',
            }}
          />              
          <Container style={{flex: 1 }}>
                <Content>
              <Card title={"פרטי שחקן"} containerStyle={{justifyContent: 'center'}} titleStyle={{justifyContent: 'center', fontSize: 22}}>
                  <CardSection>
                  <Text style={styles.textStyleHead}>שם מלא:</Text>
                  </CardSection>
                  <CardSection>
                  <Text style={styles.textStyle}>{this.props.player.fullname}</Text>
                  </CardSection>
                  <CardSection>
                  <Text style={styles.textStyleHead}>אימייל:</Text>
                  </CardSection>
                  <CardSection>
                  <Text style={styles.textStyle}>{this.props.player.email}</Text>
                  </CardSection>
                  <CardSection>
                  <Text style={styles.textStyleHead}>טלפון:</Text>
                  </CardSection>
                  <CardSection>
                  <Text style={styles.textStyle}>{this.props.player.phone}</Text>
                  </CardSection>
                  <CardSection>
                <Button onPress={() => Linking.openURL('https://chat.whatsapp.com/KlHppV78XgWBiXCRbxXsx7')}><Text style={styles.textStyleWhite}>
                <FontAwesomeIcon name="whatsapp" color="white" size={30} style={{ height: 40, width: 40, paddingLeft: 50 }}/></Text>  PS4 WhatsApp קבוצת</Button>
            </CardSection>
            <CardSection>
            <Button onPress={() => Linking.openURL('https://chat.whatsapp.com/JWhOLELoRau41BUY76OQMM')}><Text style={styles.textStyleWhite}>
                <FontAwesomeIcon name="whatsapp" color="white" size={30} style={{ height: 40, width: 40, paddingLeft: 50 }}/></Text>  XBOX ONE WhatsApp קבוצת</Button>
            </CardSection>
                  <CardSection style={{justifyContent: 'center'}}>
          </CardSection>
              </Card>

            <CompleteFlatList
        data={this.props.tours.tours}
        extraData={this.props.tours.tours}
        renderItem={this.renderItem}
        keyExtractor={item => item.id.toString()}
                />
                  <Card>
              <CardSection style={{justifyContent: 'center'}}>
          <Button style={{paddingLeft: 15}}  onPress={() => {
                         Actions.tabber({type: 'reset'});
                          Actions['agreementTab']()}}>חזרה לתפריט</Button>
          </CardSection>
              </Card>
              <FooterHandMade />
                </Content>
            </Container>
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
    redtextStyle:{
      fontSize: 16,
      fontFamily: 'Thomba',
    color: 'red',
   fontWeight: 'bold',
   textAlign: 'center',
   lineHeight: 20,
   justifyContent: 'center',
   alignItems: 'center'
    },
 textStyle: {
        fontSize: 16,
         fontFamily: 'Thomba',
       color: 'black',
      textAlign: 'center',
      lineHeight: 20,
      justifyContent: 'center',
      alignItems: 'center'
     },
     textStyleHead: {
      fontSize: 18,
       fontFamily: 'Thomba',
     color: 'black',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textAlign: 'center',
    lineHeight: 20,
    justifyContent: 'center',
    alignItems: 'center'
   },
     textStyleBig: {
        fontSize: 20,
         fontFamily: 'Thomba',
       color: 'black',
       textAlign: 'center',  
       fontWeight: 'bold',
      lineHeight: 20,
     },
     buttonTextStyle: {
        fontSize: 16,
         fontFamily: 'Thomba',
       color: 'white',
      textAlign: 'center',  
      fontWeight: 'bold',
      justifyContent: 'center',
      alignItems: 'center',
     },
        headerContentStyle: {
            flexDirection: 'column',
            justifyContent: 'space-around'
        },
        thumbnailStyle: {
            height: 70,
            width: 70
        },
        thumbnailContainerStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 10,
            marginRight: 10
        },
        headerTextStyle: {
            fontSize: 18,
            fontFamily: 'Thomba',
            color: 'grey',
           textAlign: 'center',
               fontWeight: 'bold',
           flexDirection: 'row',
             justifyContent: 'flex-end',
               borderRadius: 25,
        },
        imageStyle: {
            height: 200,
            flex: 1,
            width: 300
        }
    };
const mapStateToProps = ({ fetchTours }) => {
    const { tours } = fetchTours;
  console.log(tours)
    return  { tours };
  };

export default connect(mapStateToProps, { fetchToursAction, registerTourAction })(RegisterTour);
