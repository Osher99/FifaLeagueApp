import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginPage from './LoginPage';
import Lobby from './Lobby';
import RegisterPage from './RegisterPage';
import ForgotPassword from './ForgotPassword';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MainTable from './MainTable';
import Matches from './Matches';
import PlayerInfo from './PlayerInfo';
import EditPlayer from './EditPlayer';
import EditPlayerPassword from './EditPlayerPassword';
import Agreement from './Agreement';
import Rules from './Rules';
import Rewards from './Rewards';
import ContantUs from './ContantUs';
import PayPalPage from './PayPalPage';
import FixtureItem from './FixtureItem';
import TablePage from './TablePage.';
import Videos from './Videos';
import { Root } from "native-base";

const TabIcon = ({focused, iconName}) => {
    let color = focused ? '#1abc9c' : '#7f8c8d';
    return (
        <Icon name={iconName} color={color} size={30} style={{ height: 40, width: 40 }}/>
    );
};

const RouterComponent = () => {

    return (
        <Root>
        <Router>
            <Scene key="root">
                <Scene key="loginpage" component={LoginPage} hideNavBar={true} initial/>
                <Scene key="registerpage" component={RegisterPage} hideNavBar={true} />
                <Scene key="forgotpassword" component={ForgotPassword} hideNavBar={true} />
                
                <Scene key="tabber" tabs showLabel={false} hideNavBar>
                    <Scene key="tab1" title="חדשות" icon={TabIcon} iconName="notifications-active">
                    <Scene key="lobby" tabs component={Lobby} hideNavBar={true}/>
                        </Scene>
                    <Scene key="tab2" title="טבלה ראשית" icon={TabIcon} iconName="view-list"  >
                    <Scene key="maintableTab" tabs component={MainTable} hideNavBar={true}/>
                    <Scene key="table" tabs component={TablePage} hideNavBar={false}/>
                    </Scene>
                    
                    <Scene key="tab3" title="פרטים אישיים" icon={TabIcon} iconName="account-circle" >
                    <Scene key="infoTab" tabs component={PlayerInfo} hideNavBar={true} />
                    <Scene key="editTab" tabs component={EditPlayer} hideNavBar={true}/>
                    <Scene key="editPassword" tabs component={EditPlayerPassword} hideNavBar={true}/>

                        </Scene>
                    
                    <Scene key="tab4" title="מחזורים" icon={TabIcon} iconName="event-available"  >
                    <Scene key="matchesTab" tabs component={Matches} hideNavBar={true}/>
                    <Scene key="fixture" tabs component={FixtureItem} hideNavBar={false}/>

                    
                    </Scene>
                    <Scene key="tab5" title="תפריט מידע" icon={TabIcon} iconName="perm-device-information"  >
                    <Scene key="agreementTab" tabs component={Agreement} hideNavBar={true}/>
                    <Scene key="rules" tabs component={Rules} hideNavBar={true}/> 
                    <Scene key="rewards" tabs component={Rewards} hideNavBar={true}/> 
                    <Scene key="contactus" tabs component={ContantUs} hideNavBar={true}/> 
                    <Scene key="paypalpage" tabs component={PayPalPage} hideNavBar={true}/> 
                    </Scene>
                   
                    <Scene key="tab6" title="סרטונים" icon={TabIcon} iconName="videocam">
                    <Scene key="videos" tabs component={Videos} hideNavBar={true}/>
                        </Scene>
                </Scene>

            </Scene>
        </Router>
        </Root>
    );
};

export default RouterComponent;