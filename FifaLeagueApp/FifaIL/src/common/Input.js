import React from 'react';
import { View, Text } from 'react-native';

const Input = ({ label }) => {
    const { labelStyle, containerStyle } = styles;

    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{ label }</Text>
        </View>

    );

};

const styles = {
    inputBox: {
        width:300,
        backgroundColor:'#ffffff',
        borderRadius: 25,
        paddingHorizontal:16,
        fontSize:16,
        color:'black',
        marginVertical: 10,
        textAlign: 'center'
      },
    labelStyle: {
        fontFamily: 'Thomba',
        fontWeight: 'bold',
        width:300,
        fontSize: 19,
        color: 'black',
        borderRadius: 25,
        textAlign: 'center',
        justifyContent:'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 25
    },
    container: {
        justifyContent:'center',
        alignItems: 'center'
      }
};

export { Input };