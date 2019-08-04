import React, { Component } from 'react';
import { Header, Card } from 'react-native-elements';
import { View, ScrollView, StatusBar, Linking ,Text } from 'react-native';
import _ from 'lodash';
import { CardSection, Button } from '../common';
import { Actions } from 'react-native-router-flux';
import { getUser } from '../actions';
import {connect} from 'react-redux';
import FooterHandMade from '../common/FooterHandMade';
import Spinner from 'react-native-loading-spinner-overlay';

class Agreement extends Component {
    state = {
        spinnerAgreement: true,
        noInfoLoaded: true
    };
    componentWillUnmount () {
      this._mounted = false
      clearTimeout(this.timer);
    }
    componentDidMount() {
        this.props.getUser();
      this._mounted = true;
      if(this._mounted) {
      this.timer = setTimeout(() =>{
          this.setState({
            spinnerAgreement: false,
          }); 
          if (this.props.playerInformartion[0]) {
              this.setState({
                noInfoLoaded: false
              });
    
          }
      }, 2000);
    }
    }

    render() {
  
        if (this.state.spinnerAgreement) {
            return (
                <View>
                     <StatusBar
            backgroundColor="green"
            style="light-content"
            />
                    <Header
    statusBarProps={{ barStyle: 'light-content' }}
    barStyle="light-content" // or directly
    centerComponent={{ text: 'תפריט מידע', style: styles.headerStyle }}
    containerStyle={{
    backgroundColor: 'green',
    justifyContent: 'space-around',
    }}
    />
    <Spinner
                        visible={this.state.spinnerAgreement}
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
    centerComponent={{ text: 'תפריט מידע', style: styles.headerStyle }}
    containerStyle={{
    backgroundColor: 'green',
    justifyContent: 'space-around',
    }}
    />
    <Text style={styles.headerInfo}>בעיית תקשורת! אנא היכנס מחדש לאפליקציה</Text>
                            </View>
            ) 
        }

        return (<View style={{flex: 1}}>
            <StatusBar
            backgroundColor="green"
            style="light-content"
            /><Header
            statusBarProps={{ barStyle: 'light-content' }}
            barStyle="light-content" // or directly
            centerComponent={{ text: 'תפריט מידע', style: styles.headerStyle }}
            containerStyle={{
              backgroundColor: 'green',
              justifyContent: 'space-around',
            }}
          />
<ScrollView style={{flexGrow: 1}}>
                    <Card>
            <CardSection style={{justifyContent: 'center'}}>
            <Button style={{paddingLeft: 15}} onPress={() => {
                         Actions.tabber({type: 'reset'});
                          Actions['registertour']({ player: this.props.playerInformartion[0]})}}>הרשמה לטורניר הבא!</Button>
            </CardSection>
            <CardSection style={{justifyContent: 'center'}}>
            <Button style={{paddingLeft: 15}} onPress={() => {
                         Actions.tabber({type: 'reset'});
                          Actions['rules']()}}>חוקים</Button>
            </CardSection>
            <CardSection style={{justifyContent: 'center'}}>
            <Button style={{paddingLeft: 15}} onPress={() => {
                         Actions.tabber({type: 'reset'});
                          Actions['rewards']()}}>פרסים</Button>
            </CardSection>
            <CardSection style={{justifyContent: 'center'}}>
        <Button style={{paddingRight: 15}} onPress={() => {
                         Actions.tabber({type: 'reset'});
                          Actions['contactus'](({ player: this.props.playerInformartion[0]}))}}>צור קשר</Button></CardSection>  
<CardSection style={{justifyContent: 'center'}}>
        <Button style={{paddingRight: 15}} onPress={() => {
                                                Linking.openURL('https://sites.google.com/view/leagueil')}}>Privacy Policy</Button></CardSection>  
                         </Card>
                  </ScrollView>
                  <FooterHandMade/>
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
    }
}
const mapStateToProps = state => {
    const playerInformartion = _.map(state.playerinformation, (val, uid) => {
        return {...val, uid };
    });

        return {playerInformartion};
};

export default connect(mapStateToProps, {getUser})(Agreement) ;
