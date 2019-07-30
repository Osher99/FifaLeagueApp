import React, { Component } from 'react';
import { Linking } from 'react-native';
import { Footer, FooterTab, Button, Icon } from "native-base";
import { fetchFooterLinks } from '../actions';
import { connect } from 'react-redux';
// // import Icon from 'react-native-vector-icons/Foundation';
// // import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
// // import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// // import EntypoIcon from 'react-native-vector-icons/Entypo';
// // import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

class FooterHandMade extends Component {
    componentWillMount() {
        this.props.fetchFooterLinks();
    }
    render() {
        const { facebookLink, phoneLink, InstagramLink, whatsappLink, youtubeLink, gmailLink, telegramLink } = this.props.links;
    return (
        <Footer style={{color: 'white'}}>
        <FooterTab style={{backgroundColor:"#FFF"}}>
        <Button onPress={()=>Linking.openURL(`tel:${phoneLink}`)} style={{paddingLeft:0, paddingRight:0}}>
            <Icon type="Foundation" name="telephone" style={{ color:'#7f8c8d' }}/>
          </Button>
          <Button onPress={()=>Linking.openURL(InstagramLink)} style={{paddingLeft:0, paddingRight:0}}>
          <Icon type="MaterialCommunityIcons" name="instagram" style={{ color:'#7f8c8d' }}/>
          </Button>
          <Button onPress={()=>Linking.openURL(youtubeLink)} style={{paddingLeft:0, paddingRight:0}}>
          <Icon type="MaterialCommunityIcons"  name="youtube" style={{ color:'#7f8c8d' }}/>
          </Button>
          <Button onPress={()=>Linking.openURL(facebookLink)} style={{paddingLeft:0, paddingRight:0}}>
          <Icon type="Entypo" name="facebook" style={{ color:'#7f8c8d' }}/>
          </Button>
          <Button onPress={()=>Linking.openURL(whatsappLink)} style={{paddingLeft:0, paddingRight:0}}>
          <Icon type="FontAwesome" name="whatsapp" style={{ color:'#7f8c8d' }}/>
          </Button>
          <Button onPress={()=>Linking.openURL(gmailLink)} style={{paddingLeft:0, paddingRight:0}}>
          <Icon type="MaterialCommunityIcons"  name="gmail" style={{ color:'#7f8c8d' }}/>
          </Button>
          <Button onPress={()=>Linking.openURL(telegramLink)} style={{paddingLeft:0, paddingRight:0}}>
          <Icon type="MaterialCommunityIcons"  name="telegram" style={{ color:'#7f8c8d' }}/>
          </Button>
        </FooterTab>
        </Footer>
        );
};
}

const mapStateToProps = ({ fetchLinks }) => {
    const { links } = fetchLinks;
  
    return  { links };
  };

export default connect(mapStateToProps, {fetchFooterLinks})(FooterHandMade);
