import React from 'react';
import { Text, TouchableOpacity } from 'react-native';


const Button = ({ onPress, children }) => {
    const { button, buttonText } = styles;

    return (<TouchableOpacity onPress={onPress} style={button}>
        <Text style={buttonText}>
            { children }
        </Text>
        </TouchableOpacity>
    );
};

const styles = {

    button: {
        width:300,
        backgroundColor:'green',
         borderRadius: 25,
          marginVertical: 10,
          paddingVertical: 13,
          textAlign: 'center'
      },
      buttonText: {
        fontSize:16,
        fontWeight:'500',
        textAlign:'center',
        color: 'white'
    }
};

export { Button } ;
