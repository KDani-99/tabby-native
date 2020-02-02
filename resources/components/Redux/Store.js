import {createStore,combineReducers} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

/* Reducers */
import mainReducer from './Reducers/MainReducer';
import lessonReducer from './Reducers/LessonReducer';
import taskReducer from './Reducers/TaskReducer'

const persistConfig = {
    key: 'root0',
    storage:AsyncStorage,
};

const rootReducer = combineReducers({Main:mainReducer,Tasks:taskReducer,Timetable:lessonReducer});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);;
export const persistor = persistStore(store);