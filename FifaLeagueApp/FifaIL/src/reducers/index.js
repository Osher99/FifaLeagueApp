import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer.js';
import RegsiterReducer from './RegsiterReducer';
import RecoveryReducer from './RecoveryReducer';
import PlayerInfoReducer from './PlayerInfoReducer';
import EditReducer from './EditReducer';
import EditPasswordReducer from './EditPasswordReducer';
import ContactUsReducer from './ContactUsReducer';
import FetchRewardsReducer from './FetchRewardsReducer.js';
import PaymentReducer from './PaymentReducer';
import RulesReducer from './RulesReducer.js';
import FixtureReducer from './FixtureReducer';
import TableReducer from './TableReducer.js';
import NewsReducer from './NewsReducer.js';
import LinksReducer from './LinksReducer.js';
import VideosReducer from './VideosReducer.js';
import ToursReducer from './ToursReducer';

export default combineReducers({
    auth: AuthReducer,
    register: RegsiterReducer,
    passRecovery: RecoveryReducer,
    playerinformation: PlayerInfoReducer,
    edit: EditReducer,
    editpassword: EditPasswordReducer,
    contactreducer: ContactUsReducer,
    fetchRewards: FetchRewardsReducer,
    fetchPayment: PaymentReducer,
    fetchRules: RulesReducer,
    fetchFixtures: FixtureReducer,
    fetchTables: TableReducer,
    fetchNews: NewsReducer,
    fetchLinks: LinksReducer,
    fetchVideos: VideosReducer,
    fetchTours: ToursReducer
});