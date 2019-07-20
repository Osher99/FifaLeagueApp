import React from 'react';
import { View, Linking, ScrollView, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { CardSection, Button } from '../common';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { WebView } from 'react-native-webview';


const VideoItem = ({ video }) => {
     return (
        <View key={video.id} style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
            <Card>
        <CardSection>
        <Text style={styles.headerTextStyle}>{video.title}</Text>
            <View style={styles.headerContentStyle}>
        </View>
        <CardSection>
        </CardSection>
        </CardSection>
        <WebView 
source={{ html: '<html><meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" /><iframe src="https://www.youtube.com/embed/' + video.youtubeId + '?modestbranding=1&playsinline=1&showinfo=0&rel=0" frameborder="0" style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px" height="100%" width="100%"></iframe></html>'}} 
style={{height: 300, width: 360}}
/>
    <ScrollView style={{flexGrow: 1}}>
        <CardSection>
            <Text style={styles.dateStyle}>{video.date}</Text>
            </CardSection>
            <CardSection>
            <Text style={styles.textStyle}>{video.description}</Text>
            </CardSection>
         </ScrollView>
        <CardSection>
            <Button onPress={() => Linking.openURL(video.youtubeLink)}><Text style={styles.buttonTextStyle}>
            <FontAwesomeIcon name="youtube-square" color="white" size={30} style={{ height: 40, width: 40, paddingLeft: 50 }}/>  YouTubeצפה ב </Text></Button>
        </CardSection>
    </Card>
  </View>
    );
};



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
      textAlign: 'right',  
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
           textAlign: 'right',
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

export default VideoItem;