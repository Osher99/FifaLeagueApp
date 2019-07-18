import React, { Component } from 'react';
import { ScrollView, View, TouchableOpacity, Image, StatusBar } from 'react-native';
import { Header } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import { fetchFixturesAction } from '../actions';
import { connect } from 'react-redux';
import { Container, Content, ListItem, Left, Body, Right, Title, Text } from "native-base";
import CompleteFlatList from 'react-native-complete-flatlist';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Actions } from 'react-native-router-flux';
import FooterHandMade from '../common/FooterHandMade';

class Matches extends Component {

    state = {
        spinnerMatches: true
        };

    _mounted = false;
    componentWillUnmount () {
        this._mounted = false;
        clearTimeout(this.timer);
     }
     
    componentDidMount() {
        this._mounted = true;
        if(this._mounted) {
            this.props.fetchFixturesAction();
        this.timer = setTimeout(() =>{
            this.setState({
                spinnerMatches: false
                });
        }, 1000);
    }
}
fixturePressed(item) {
    Actions['fixture']({ fixture: item})
}

     renderItem = (item)  => {
           return (
               <View style={{flex: 1}}>
            <ListItem style={{flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center'}} itemDivider>
            <TouchableOpacity onPress={() => {
                         Actions.tabber({type: 'reset'});
                          Actions['fixture'](({ fixture: item }))}}>
            <Body style={{flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
              <Text style={styles.textStyle}>
              <Icon name="soccer-field" color="black" size={30} style={{ height: 40, width: 40, paddingLeft: 50 }}/> {item.fixtureTitle} <Icon name="soccer-field" color="black" size={30} style={{ height: 40, width: 40, paddingLeft: 50 }}/>
              </Text>
            </Body>
            </TouchableOpacity>
          </ListItem>
         </View>
                  );
         }

    render() {
        if (this.state.spinnerMatches) {
            return (
                <View>
                    <Header
  statusBarProps={{ barStyle: 'light-content' }}
  barStyle="light-content" // or directly
  centerComponent={{ text: 'מחזורים', style: styles.headerStyle }}
  containerStyle={{
    backgroundColor: 'green',
    justifyContent: 'space-around',
  }}
/>
                    <Spinner
                        visible={this.state.spinnerMatches}
                        textContent={'טוען...'}
                            />
                            </View>
            )
        }
        return (
<View style={{ flex: 1 }}>
<StatusBar
            backgroundColor="green"
            style="light-content"
            />
<Header
  statusBarProps={{ barStyle: 'light-content' }}
  barStyle="light-content" // or directly
  centerComponent={{ text: 'מחזורים', style: styles.headerStyle }}
  containerStyle={{
    backgroundColor: 'green',
    justifyContent: 'space-around',
  }}
/><Image source={{uri: 'https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-20/global-assets/common/fifa20-grid-tile-requirements-16x9.png.adapt.crop191x100.628p.png'}}
           style={styles.logoStyle} />
<ScrollView style={{ flexGrow: 1}}>
            <Container>
                <Content>
            <CompleteFlatList
        data={this.props.matches.fixtures}
        extraData={this.props.matches.fixtures}
        renderItem={this.renderItem}
        keyExtractor={item => item.id.toString()}
                />            
                </Content>
            </Container>
            </ScrollView>
            <FooterHandMade />
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
        fontSize: 15,
        fontFamily: 'Thomba',
        color: 'black',
        textAlign: 'center',
         flexDirection: 'row',
         justifyContent: 'center',
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
};

const mapStateToProps = ({ fetchFixtures }) => {
    const { matches } = fetchFixtures;
    return  { matches };
};

export default connect( mapStateToProps, { fetchFixturesAction } )(Matches);
