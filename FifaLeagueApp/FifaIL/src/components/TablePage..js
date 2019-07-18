import React, { Component } from 'react';
import { View, ScrollView, Image, StatusBar } from 'react-native';
import { Card } from 'react-native-elements';
import CompleteFlatList from 'react-native-complete-flatlist';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Container, Content, ListItem, Left, Body, Right, Title, Text } from "native-base";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { CardSection, Button } from '../common';
import { Actions } from 'react-native-router-flux';
import FooterHandMade from '../common/FooterHandMade';

class TablePage extends Component{

    render(){
        const width = 115;
        const height = 52;
        const tableHeadInfo = ["קבוצה", "הפרש שערים", "נקודות"]
        let currentTable = this.props.table.tableTeams;
        currentTable.sort((a, b) => a.points > b.points ? -1 : 1);
        console.log(this.props.table.tableTitle);
        console.log(currentTable)
    return (
        <View style={{flex: 1}}>
        <StatusBar
        backgroundColor="green"
        style="light-content"
        />
        <Image source={{uri: 'https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-20/global-assets/common/fifa20-grid-tile-requirements-16x9.png.adapt.crop191x100.628p.png'}}
        style={styles.logoStyle} />
    <ScrollView style={{ flexGrow: 1}}>
        <Card title={this.props.table.tableTitle} titleStyle={styles.headerInfo}>
                <Table>      
              <Row data={tableHeadInfo} width={width} height={45} style={styles.head} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>  
                <Table>
              {                  
                  currentTable.map((team, index) =>  (
                <View key={currentTable.indexOf(team)} style={{flexDirection: "row"}}>
                    <Cell
                      key={index+1}
                      data={team.teamName}
                      textStyle={styles.textStyle}
                      width={width}
                      height={height}
                    />
                    <Cell
                      key={index+100}
                      data={team.goalStand}
                      textStyle={styles.textStyle}
                      width={width}
                      height={height}
                      />     
                    <Cell
                      key={index+1100}
                      data={team.points}
                      textStyle={styles.pointsStyle}
                      width={width}
                      height={height}
                      />
                </View>
              ))
              }
        </Table>
        </ScrollView>
            </Card>
            <Card>
              <CardSection style={{justifyContent: 'center'}}>
          <Button style={{paddingLeft: 15}}  onPress={() => {
                         Actions.tabber({type: 'reset'});
                          Actions['maintableTab']()}}>חזרה לטבלאות</Button>
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
        fontSize: 16,
        fontFamily: 'Thomba',
        color: 'black',
        textAlign: 'center',
         flexDirection: 'row',
         justifyContent: 'center',
         borderRadius: 25,
    }, pointsStyle: {
        fontSize: 16,
        fontFamily: 'Thomba',
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
         flexDirection: 'row',
         justifyContent: 'center',
         borderRadius: 25,
    },
     container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: {  height: 40,  backgroundColor: '#f1f8ff'  },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: {  height: 28  },
    text: { textAlign: 'center' },
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

export default TablePage;
