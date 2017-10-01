import { createStore } from 'redux';
import reducer from '../reducer/reducer';

var store = createStore(reducer);

export default store;