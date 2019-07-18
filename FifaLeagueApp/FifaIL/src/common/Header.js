// import libraries
import React from 'react';
import { Text, View } from 'react-native';

// Making components
const Header = (props) => {
    const { textStyle, viewStyle } = styles;
    return (
    <View style={viewStyle}>
    <Text style={textStyle}> {props.headerText} </Text>
    </View>
        );
};

const styles = {
    viewStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 60,
      paddingTop: 15,
      backgroundColor: '#fff',
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 7 },
      shadowRadius: 5,
      shadowOpacity: 2.0,
      elevation: 10,
      position: 'relative',
      color: 'black'

    },
    textStyle: {
        fontSize: 30,
        fontFamily: 'Thomba',
        color: 'black'

    }
};

// Show componenet to parts of the app
// export default Header;
export { Header };
