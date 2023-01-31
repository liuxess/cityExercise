import { combineReducers } from 'redux';
import UserRole from './UserRole';

const CombinedReducers = combineReducers({
    UserRole: UserRole
});

export default CombinedReducers;
