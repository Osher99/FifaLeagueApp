import React from 'react';
import { Text } from 'react-native';
import { CardSection } from '../common';

const Match = ({ match }) => {
    const { textStyle } = styles;

    return (        
        <CardSection>
            <Text style={textStyle}>{match}</Text>
        </CardSection>
    );
};

const styles = {
        textStyle: {
        fontSize: 15,
        fontFamily: 'Thomba',
        color: 'black',
        textAlign: 'center',
         flexDirection: 'row',
         justifyContent: 'center',
         borderRadius: 25,
    },
};

export default Match;
