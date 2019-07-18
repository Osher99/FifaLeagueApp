import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import Match from './Match';

class FixtureItem extends Component{
    componentWillMount() {
        console.log(this.props.fixture)
        console.log(this.props)
    }

    renderGames() {
        const { fixturesList } = this.props.fixture;
        console.log(this.props.fixture)
        console.log(this.props)
        if (fixturesList == []) {
            alert('No Internet connection');
            return (
                <View>
                    <Text>NO_INTERNET_CONNECTION</Text>
                </View>
            );
        }
        return fixturesList.map(
            match => 
            <Match key={fixturesList.indexOf(match)} match={match} />           
          );
    }
    
    render(){

        const { fixtureTitle, fixtureEndDate} = this.props.fixture;
        const {
            headerInfo,
            semiHeader
        } = styles;

    return (  
        <Card title={fixtureTitle} titleStyle={headerInfo}>
            <Card>
               {this.renderGames()}
            </Card>
            <Card>
                <Text style={semiHeader}>כל המשחקים חייבים להיות משוחקים עד {fixtureEndDate} (כולל)</Text>
            </Card>
      </Card>
    );

    }
}


const styles = {
    headerContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
        headerTextStyle: {
        fontSize: 18
    },
    headerInfo: {
        fontSize: 18,
        fontFamily: 'Thomba',
        color: 'grey',
        textAlign: 'center',
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    semiHeader: {
        fontSize: 16,
        fontFamily: 'Thomba',
        color: 'green',
        textAlign: 'center',
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },textStyle: {
        fontSize: 16,
        fontFamily: 'Thomba',
        color: 'black',
        textAlign: 'center',
         flexDirection: 'row',
         justifyContent: 'center',
         borderRadius: 25,
    },
};

export default FixtureItem;
