import React, { Component } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { Card } from 'react-native-elements';
import CompleteFlatList from 'react-native-complete-flatlist';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Container, Content, ListItem, Left, Body, Right, Title, Text } from "native-base";
import FooterHandMade from '../common/FooterHandMade';
import { CardSection, Button } from '../common';
import { Actions } from 'react-native-router-flux';

class FixtureItem extends Component{
    
    renderItem = (item)  => {
        return (
            <View>
         <ListItem style={{justifyContent: 'center'}} itemDivider>
         <Body style={{justifyContent: 'center'}}>
           <Text style={styles.textStyle}>
           <Icon name="soccer" color="black" size={30} style={{ height: 40, width: 40, paddingLeft: 50 }}/> {item} <Icon name="soccer" color="black" size={30} style={{ height: 40, width: 40, paddingLeft: 50 }}/>
           </Text>
         </Body>
         </ListItem>
      </View>
        );
}
renderSeparator = () => {  
    return (  
        <View  
            style={{  
                height: 1,  
                width: "100%",  
                backgroundColor: "black",  
            }}  
        />  
    );  
};  

    render(){
        const { fixtureTitle, fixtureEndDate, fixturesList} = this.props.fixture;
        const {
            headerInfo,
            semiHeader
        } = styles;

    return (
        <View style={{flex: 1}}>
        <Image source={{uri: 'https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-20/global-assets/common/fifa20-grid-tile-requirements-16x9.png.adapt.crop191x100.628p.png'}}
        style={styles.logoStyle} />
    <ScrollView style={{ flexGrow: 1}}>
        <Card title={fixtureTitle} titleStyle={headerInfo}>
                <Content>
            <CompleteFlatList
        data={fixturesList}
        extraData={fixturesList}
        renderItem={this.renderItem}
        keyExtractor={item => fixturesList.indexOf(item)}
        ItemSeparatorComponent={this.renderSeparator}  
                /></Content>
      </Card>
      <Card>
              <CardSection style={{justifyContent: 'center'}}>
          <Button style={{paddingLeft: 15}}  onPress={() => {
                         Actions.tabber({type: 'reset'});
                          Actions['matchesTab']()}}>חזרה למחזורים</Button>
          </CardSection>
              </Card>
      <FooterHandMade />    
    </ScrollView>
    </View>
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
        fontSize: 13,
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

export default FixtureItem;
