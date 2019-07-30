import React, { Component } from 'react';
import { View, Image, Linking, ScrollView, StatusBar } from 'react-native';
import { fetchNewsAction } from '../actions';
import {connect} from 'react-redux';
import _ from 'lodash';
import Spinner from 'react-native-loading-spinner-overlay';
import { Header, Card } from 'react-native-elements';
import CompleteFlatList from 'react-native-complete-flatlist';
import { Container, Content, ListItem, Text, Thumbnail, Footer, Icon } from "native-base";
import { CardSection, Button } from '../common';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FooterHandMade from '../common/FooterHandMade';
import thumbnail from '../assets/Images/thumbnail.png';

class Lobby extends Component {
    
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
        this.props.fetchNewsAction();
        this.timer = setTimeout(() =>{
            this.setState({
                spinner: false
            });
        }, 2000);
    }
    }

    renderItem = (item)  => {
        return (
            <View key={item.id} style={{justifyContent: 'center', alignItems:'center'}}>
                <ListItem itemHeader>
                <Card>
                <View style={styles.thumbnailContainerStyle}>
                    <Thumbnail
                    source={thumbnail}
                    />
                </View>
            <CardSection>
            <Text style={styles.headerTextStyle}>{item.title}</Text>
                <View style={styles.headerContentStyle}>
            </View>
            </CardSection>
            <CardSection>
            <Text style={styles.headerTextStyle}>{item.date}</Text>
            </CardSection>
            <CardSection>
                <Image style={styles.imageStyle} source={{ uri: item.image }} />
            </CardSection>
            <ScrollView style={{flexGrow: 1}}>
                <CardSection>
                <Text style={styles.textStyle}>{item.description}</Text>
                </CardSection>
             </ScrollView>
        </Card>
         </ListItem>
      </View>
        );
      }


    render() {
        if (this.state.spinner) {
            return (
                <View>
                     <StatusBar
            backgroundColor="green"
            style="light-content"
            />
                    <Header
  statusBarProps={{ barStyle: 'light-content' }}
  barStyle="light-content" // or directly
  centerComponent={{ text: 'חדשות', style: styles.headerStyle }}
  containerStyle={{
    backgroundColor: 'green',
    justifyContent: 'space-around',
  }}
/>
<Spinner
                        visible={this.state.spinner}
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
  centerComponent={{ text: 'חדשות', style: styles.headerStyle }}
  containerStyle={{
    backgroundColor: 'green',
    justifyContent: 'space-around',
  }}
/><Container style={{flex: 1 }}>
                <Content>
                    <Card>
                <CardSection>
                <Button onPress={() => Linking.openURL('https://chat.whatsapp.com/KlHppV78XgWBiXCRbxXsx7')}><Text style={styles.buttonTextStyle}>
                <FontAwesomeIcon name="whatsapp" color="white" size={30} style={{ height: 40, width: 40, paddingLeft: 50 }}/>  WhatsAppהצטרפות לקבוצת ה </Text></Button>
            </CardSection>
            </Card>
            <CompleteFlatList
        data={this.props.news.news}
        extraData={this.props.news.news}
        renderItem={this.renderItem}
        keyExtractor={item => item.id.toString()}
                />
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
 textStyle: {
        fontSize: 16,
         fontFamily: 'Thomba',
       color: 'black',
      fontWeight: 'bold',
      textAlign: 'center',
      lineHeight: 20,
      justifyContent: 'center',
      alignItems: 'center'
     },
     textStyle: {
        fontSize: 18,
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


const mapStateToProps = ({ fetchNews }) => {
    const { news } = fetchNews;

    return { news };
}

 export default connect(mapStateToProps, {fetchNewsAction})(Lobby);