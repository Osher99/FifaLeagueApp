import React, { Component } from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import { Toast } from 'native-base';
import { Header, Card } from 'react-native-elements';
import { CardSection, Button } from '../common';
import { connect } from 'react-redux';
import { fetchRewardsAction } from '../actions';
import Spinner from 'react-native-loading-spinner-overlay';
import RewardItem from './RewardItem';
import { Actions } from 'react-native-router-flux';
import FooterHandMade from '../common/FooterHandMade';

class Rewards extends Component {
      
    _mounted = false;
    state ={
        spinner: true
    };

    componentWillUnmount () {
        this._mounted = false
        clearTimeout(this.timer);
     }

    componentDidMount() {
        this._mounted = true;
        if(this._mounted) {
            this.props.fetchRewardsAction();
        this.timer = setTimeout(() =>{
            this.setState({
                spinner: false
            });
        }, 1000);
    }
    }


    renderRewards() {
        const { rewards } = this.props;
        if (rewards == {}) {
            Toast.show({
                text: 'בעיות חיבור לאינטרנט, אנא טען מחדש את האפליקציה',
                type: 'danger',
                duration: 3000,
                buttonText: 'אחלה'
            })
            return (
                <View>
                    <Text>NO_INTERNET_CONNECTION</Text>
                </View>
            );
        }
        let rewardsList = Object.entries(rewards);
        console.log(rewardsList);
        return rewardsList.map(
            reward => 
            <RewardItem key={reward[1].id} reward={reward[1]} />           
          );
    }

    render() {
        return (
<View style={styles.containerStyle}>
<StatusBar
            backgroundColor="green"
            style="light-content"
            />
<Header
  statusBarProps={{ barStyle: 'light-content' }}
  barStyle="light-content" // or directly
  centerComponent={{ text: 'פרסים', style: styles.headerStyle }}
  containerStyle={{
    backgroundColor: 'green',
    justifyContent: 'space-around',
  }}
/><Spinner
            visible={this.state.spinner}
            textContent={'טוען...'}
                />
    <ScrollView>
                {this.renderRewards()}
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
    containerStyle: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      justifyContent: 'flex-start'
    },
    searchInput:{
        justifyContent: 'center',
        width:415,
        textAlign: 'center',
        justifyContent: 'center',
       fontSize: 20,
       backgroundColor: 'white',
      padding: 10,
      borderColor: 'grey',
      borderWidth: 3,
      alignItems: 'center',
      alignSelf: 'center',
    },   headerStyle: {
        fontSize: 25,
        fontFamily: 'Thomba',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
    }
};

const mapStateToProps = ({ fetchRewards }) => {
    const { rewards } = fetchRewards;
  
    return  { rewards };
  };

export default connect(mapStateToProps , { fetchRewardsAction })(Rewards);
