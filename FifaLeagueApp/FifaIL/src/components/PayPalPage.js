import React, { Component } from 'react';
import { View, Text, Linking, ScrollView, StatusBar } from 'react-native';
import { Toast } from 'native-base';
import { Header, Card } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import { CardSection, Button } from '../common';
import Icon from 'react-native-vector-icons/Zocial';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { fetchPaymentMethods } from '../actions';
import FooterHandMade from '../common/FooterHandMade';

class PayPalPage extends Component {
    state = {
        spinnerPay: true
    };
    _mounted = false;

    componentWillUnmount () {
        this._mounted = false
        clearTimeout(this.timer);
     }
     
    componentDidMount() {
        this._mounted = true;
        if(this._mounted) {
            this.props.fetchPaymentMethods();
            console.log(this.props);
        this.timer = setTimeout(() =>{
            this.setState({
                spinnerPay: false
            });
        }, 1000);
    }
    }

    payPalPress() {
        if (this.props.methods.paypalmethod == "undefined") {
            Toast.show({
                text: 'בעיות חיבור נא להיכנס מחדש לאפליקציה!',
                type: 'danger',
                duration: 3000,
                buttonText: 'אחלה'
            })
            return;
        }
        Linking.openURL(this.props.methods.paypalmethod);
    }

    phonePress() {
        if (this.props.methods.phonemethod == "undefined") {
            Toast.show({
                text: 'בעיות חיבור נא להיכנס מחדש לאפליקציה!',
                type: 'danger',
                duration: 3000,
                buttonText: 'אחלה'
            })
            return;
        }       
         Linking.openURL(`tel:${this.props.methods.phonemethod}`);
    }
    
    renderIsPaid() {

        if (!this.props.player.isPaid) {
        return (
            <CardSection>
            <Text style={styles.notPaidStyle}>עדיין לא הוסדר תשלום    <FontAwesomeIcon name="close" color="red" size={30} style={{ height: 40, width: 40, paddingLeft: 50 }}/></Text>
        </CardSection>
        );
    } else {
        return (
            <CardSection>
            <Text style={styles.paidStyle}>תשלום הוסדר בהצלחה    <FontAwesomeIcon name="check" color="green" size={30} style={{ height: 40, width: 40, paddingLeft: 50 }}/></Text>
        </CardSection>
        );
    }
    }

    render() {
        console.log(this.props.player);
        return (  
      
            <View style={{flex: 1}}>
            <StatusBar
            backgroundColor="green"
            style="light-content"
            /><Header
            statusBarProps={{ barStyle: 'light-content' }}
            barStyle="light-content" // or directly
            centerComponent={{ text: 'קניית כרטיס', style: styles.headerStyle }}
            containerStyle={{
              backgroundColor: 'green',
              justifyContent: 'space-around',
            }}
          />
                                     <Spinner
            visible={this.state.spinnerPay}
            textContent={'טוען...'}
                /> 
          <ScrollView style={{flexGrow: 1}}>
              <Card>
                  <CardSection style={{justifyContent: 'center'}}>
              <Button  style={{paddingRight: 15}}  onPress={this.payPalPress.bind(this)}>
                  שלם באמצעות <Icon name="paypal" color="black" size={30} style={{ height: 40, width: 40, paddingLeft: 50 }}/>   PayPal  </Button>
              </CardSection>
              <CardSection style={{justifyContent: 'center'}}>
              <Button  style={{paddingRight: 15}}  onPress={this.phonePress.bind(this)}>   שלם באמצעות העברה בנקאית  <Icon name="call" color="black" size={30} style={{ height: 40, width: 40, paddingLeft: 50 }}/> </Button>
              </CardSection>
              </Card>
              <Card>
              {this.renderIsPaid()}
              </Card>
              <Card>
              <CardSection style={{justifyContent: 'center'}}>
          <Button style={{paddingLeft: 15}}  onPress={() => {
                         Actions.tabber({type: 'reset'});
                          Actions['agreementTab']()}}>חזרה לתפריט</Button>
          </CardSection>
              </Card>
              </ScrollView>
              <FooterHandMade />
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
 },   headerStyle: {
    fontSize: 25,
    fontFamily: 'Thomba',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold'
},
textStyle: {
    fontSize: 16,
    fontFamily: 'Thomba',
    color: 'black',
    textAlign: 'right',
     fontWeight: 'bold',
     flexDirection: 'row',
     justifyContent: 'flex-end',
     borderRadius: 25
},
notPaidStyle: {
    fontSize: 18,
    fontFamily: 'Thomba',
    color: 'red',
    textAlign: 'right',
     fontWeight: 'bold',
     flexDirection: 'row',
     justifyContent: 'flex-end',
     borderRadius: 25
},
paidStyle: {
    fontSize: 18,
    fontFamily: 'Thomba',
    color: 'green',
    textAlign: 'right',
     fontWeight: 'bold',
     flexDirection: 'row',
     justifyContent: 'flex-end',
     borderRadius: 25
}
}

const mapStateToProps = ({ fetchPayment }) => {
    const { methods } = fetchPayment;
    console.log(methods);
    return  { methods };
  };


export default connect(mapStateToProps, {fetchPaymentMethods})(PayPalPage);
