import React from 'react';
import { Text, Image } from 'react-native';
import { CardSection, Button } from '../common';
import {  Card } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import FooterHandMade from '../common/FooterHandMade';

const RewardItem = ({ reward }) => {
    const { name, forPlace, image, description} = reward;
    const {semiHeader,
        headerInfo,
        imageStyle,
        textStyle
    } = styles;

    return (        
        <Card title={name} titleStyle={headerInfo}>
            <CardSection>
                    <Image
                    style={imageStyle}
                    source={{ uri: image }} 
                    />
                    </CardSection>
                    <CardSection>
            <Text style={headerInfo}>{name}</Text>
            </CardSection>
            <CardSection>
            <Text style={semiHeader}>יוענק למקום - {forPlace}</Text>
            </CardSection>
            <Card>
            <Text style={textStyle}>{description}</Text>
            </Card>
      </Card>
    );
};

const styles = {
    headerContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    thumbnailStyle: {
        height: 50,
        width: 50
    },
        headerTextStyle: {
        fontSize: 18
    },
    imageStyle: {
        height: 320,
        flex: 1,
        width: 150
    },
    headerInfo: {
        fontSize: 20,
        fontFamily: 'Thomba',
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    semiHeader: {
        fontSize: 15,
        fontFamily: 'Thomba',
        color: 'black',
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
         lineHeight: 20,
    },
};

export default RewardItem;
