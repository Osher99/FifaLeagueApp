import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Header } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import { fetchFixturesAction } from '../actions';
import { connect } from 'react-redux';
import FixtureItem from './FixtureItem';
import { CardSection } from '../common';

class Matches extends Component {
    state = {
        spinnerMatches: true,
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
    renderFixtures() {
        const { matches } = this.props;
        if (matches == {}) {
            alert('No Internet connection');
            return (
                <View>
                    <Text>NO_INTERNET_CONNECTION</Text>
                </View>
            );
        }            
        return matches.fixtures.map((fixture) => <FixtureItem key={this._mocked} fixture={fixture}/>
        );
    }

    render() {
        return (
            <View>   
<Header centerComponent={{ text: 'מחזורים', style: styles.headerStyle}}/>
<Spinner
            visible={this.state.spinnerMatches}
            textContent={'טוען...'}
                />
    <ScrollView style={{flexGrow: 1}}>
   {this.state.spinnerMatches ?  <Header centerComponent={{ text: 'טוען מחזורים...', style: styles.headerStyle}}/>: this.renderFixtures()}
        
        <CardSection></CardSection>
        <CardSection></CardSection>
        <CardSection></CardSection>
        <CardSection></CardSection>
        <CardSection></CardSection>
        <CardSection></CardSection>

    </ScrollView>
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
        fontSize: 27,
        fontFamily: 'Thomba',
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
    }
};

const mapStateToProps = ({ fetchFixtures }) => {
    console.log(fetchFixtures)
    const { matches } = fetchFixtures;
    console.log(matches)
    return  { matches };

};


export default connect( mapStateToProps, { fetchFixturesAction } )(Matches);
