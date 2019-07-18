import React, { Component } from 'react';
import { View, ScrollView, StatusBar, Image } from 'react-native';
import { Header, Card } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import { CardSection, Button } from '../common';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { fetchRulesAction } from '../actions';
import { Container, Content, ListItem, Left, Body, Right, Title, Text } from "native-base";
import CompleteFlatList from 'react-native-complete-flatlist';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FooterHandMade from '../common/FooterHandMade';

class Rules extends Component {

    state = {
        spinnerRules: true
    };
    _mounted = false;

    componentWillUnmount () {
        this._mounted = false
        clearTimeout(this.timer);
     }

    componentDidMount() {
        this._mounted = true;
        if(this._mounted) {
            this.props.fetchRulesAction();
        this.timer = setTimeout(() =>{
            this.setState({
                spinnerRules: false
            });
        }, 1000);
    }
    }

    
    renderItem = (item)  => {
        return (
                <ListItem key={this.props.rules.rules.indexOf(item)} itemHeader>
             <Card containerStyle={{justifyContent: 'center', alignItems:'center' }}>
             <Title style={styles.headerStyle}><Icon name="soccer" color="black" size={30} style={{ height: 40, width: 40, paddingLeft: 50 }}/> {item.ruleTitle} <Icon name="soccer" color="black" size={30} style={{ height: 40, width: 40, paddingLeft: 50 }}/></Title>
           <CardSection>
           <Text style={styles.textStyle}>
           {item.ruleDescription}
           </Text>
           </CardSection>
           </Card>
         </ListItem>
               );
      }

    render() {   
        return (
            <View style={{flex: 1}}>
                        <StatusBar
            backgroundColor="green"
            style="light-content"
            /><Header
            statusBarProps={{ barStyle: 'light-content' }}
            barStyle="light-content" // or directly
            centerComponent={{ text: 'חוקים ותקנון', style: styles.headerStyle }}
            containerStyle={{
              backgroundColor: 'green',
              justifyContent: 'space-around',
            }}
          />
            <Spinner
            visible={this.state.spinnerRules}
            textContent={'טוען...'}
                />
            <Container style={{justifyContent: 'center', alignItems:'center' }}>
                <Content>
            <CompleteFlatList
        data={this.props.rules.rules}
        extraData={this.props.rules.rules}
        renderItem={this.renderItem}
        keyExtractor={item => this.props.rules.rules.indexOf(item).toString()}
                /></Content>
            </Container>
              <Card>
              <CardSection style={{justifyContent: 'center'}}>
          <Button style={{paddingLeft: 15}}  onPress={() => {
                         Actions.tabber({type: 'reset'});
                          Actions['agreementTab']()}}>חזרה לתפריט</Button>
          </CardSection>
              </Card>
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
 },   
 headerStyle: {
    fontSize: 27,
    fontFamily: 'Thomba',
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    textAlign: 'center'
},
textStyle: {
    fontSize: 15,
    color: 'black',
     fontFamily: "Thomba",
     justifyContent: 'center',
     alignItems: 'center',
     fontWeight: 'bold',
     textAlign: 'right',
     lineHeight: 25,
    },
notPaidStyle: {
    fontSize: 18,
    fontFamily: 'Thomba',
    color: 'red',
    textAlign: 'right',
     fontWeight: 'bold',
     flexDirection: 'row',
     justifyContent: 'flex-end',
     borderRadius: 25,
}, headerStyle: {
    fontSize: 25,
    fontFamily: 'Thomba',
    color: 'black',
    textAlign: 'right',
     fontWeight: 'bold',
     borderRadius: 25,
},
paidStyle: {
    fontSize: 18,
    fontFamily: 'Thomba',
    color: 'green',
    textAlign: 'right',
     fontWeight: 'bold',
     flexDirection: 'row',
     justifyContent: 'flex-end',
     borderRadius: 25,
},
logoStyle: {
    justifyContent: 'center',
    //backgroundColor: 'rgba(0,0,0,0.5)',
    height: 200,
    width: 500,
    alignItems: 'center',
    alignSelf: 'center',
    paddingBottom: 35
}

}

const mapStateToProps = ({ fetchRules }) => {
    const { rules } = fetchRules;
    return  { rules };
  };

export default connect(mapStateToProps, {fetchRulesAction})(Rules);
