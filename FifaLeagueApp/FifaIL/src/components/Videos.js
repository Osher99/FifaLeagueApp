import React, { Component } from 'react';
import { View, Linking, ScrollView, StatusBar } from 'react-native';
import { fetchVideosAction } from '../actions';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { Header, Card } from 'react-native-elements';
import CompleteFlatList from 'react-native-complete-flatlist';
import { Container, Content, ListItem, Text } from "native-base";
import { CardSection, Button } from '../common';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FooterHandMade from '../common/FooterHandMade';
import { WebView } from 'react-native-webview';
import VideoItem from './VideoItem';



class Videos extends Component {
    
    _mounted = false;
    state ={
        spinnerVideos: true,
        noVideosLoaded: true
    };

    componentWillUnmount () {
        this._mounted = false
        clearTimeout(this.timer);
     }

    componentDidMount() {
        this._mounted = true;
        if(this._mounted) {
        this.props.fetchVideosAction();
        this.timer = setTimeout(() =>{
            this.setState({
                spinnerVideos: false
            });
            if (this.props.videos.videos) {
                this.setState({
                    noVideosLoaded: false
                });
            }

        }, 2000);
    }
    }

      renderVideos() {
        const { videos } = this.props.videos;
        console.log(videos)
        return videos.map(
            video => 
            <VideoItem key={video.id} video={video} />           
          );
    }

    render() {
        if (this.state.spinnerVideos) {
            return (
                <View>
                     <StatusBar
            backgroundColor="green"
            style="light-content"
            />
                    <Header
  statusBarProps={{ barStyle: 'light-content' }}
  barStyle="light-content" // or directly
  centerComponent={{ text: 'סרטונים', style: styles.headerStyle }}
  containerStyle={{
    backgroundColor: 'green',
    justifyContent: 'space-around',
  }}
/>
<Spinner
                        visible={this.state.spinnerVideos}
                        textContent={'טוען...'}
                            />
                            </View>
            )
        }

        if (this.state.noVideosLoaded) {
            return (
                <View style={styles.container}>
                <StatusBar
                            backgroundColor="green"
                            style="light-content"
                            />
                <Header
                  statusBarProps={{ barStyle: 'light-content' }}
                  barStyle="light-content" // or directly
                  centerComponent={{ text: 'סרטונים', style: styles.headerStyle }}
                  containerStyle={{
                    backgroundColor: 'green',
                    justifyContent: 'space-around',
                  }}
                />
<Text style={styles.headerStyle}>בעיית תקשורת! אנא היכנס מחדש לאפליקציה</Text>
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
  centerComponent={{ text: 'סרטונים', style: styles.headerStyle }}
  containerStyle={{
    backgroundColor: 'green',
    justifyContent: 'space-around',
  }}
/>

<Container style={{flex: 1 }}>
          <Content>
              {this.renderVideos()}
{/* 
            <CompleteFlatList
        data={this.props.videos.videos}
        extraData={this.props.videos.videos}
        renderItem={this.renderItem}
        keyExtractor={item => item.id.toString()}
                />
                 */}
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
      textAlign: 'center',  
      fontWeight: 'bold',
      lineHeight: 20,
      justifyContent: 'center',
      alignItems: 'center'
     },
     dateStyle: {
        fontSize: 18,
         fontFamily: 'Thomba',
       color: 'black',
      textAlign: 'center',  
      fontWeight: 'bold',
      lineHeight: 20,
      justifyContent: 'center',
      alignItems: 'center'
     },
     buttonTextStyle: {
        fontSize: 16,
         fontFamily: 'Thomba',
       color: 'white',
       textAlign: 'center',  
       fontWeight: 'bold',
      justifyContent: 'center',
      alignItems: 'center'
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
            fontSize: 20,
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
        },
        cardRounded: {
            paddingEnd:0,  paddingTop: 0 , paddingBottom: 0, paddingStart: 0, padding:0,
            borderRadius: 12, alignItems:"center", backgroundColor: '#000000' ,flex:0, height:240,
        }
    };


const mapStateToProps = ({ fetchVideos }) => {
    const { videos } = fetchVideos;
    console.log(videos);
    return { videos };
}

 export default connect(mapStateToProps, {fetchVideosAction})(Videos);