import {createStore,combineReducers} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

/* Reducers */
import mainReducer from './Reducers/MainReducer';
import lessonReducer from './Reducers/LessonReducer';
import taskReducer from './Reducers/TaskReducer'
import languageReducer from './Reducers/LanguageReducer';

const persistConfig = {
    key: 'root0',
    storage:AsyncStorage,
    blacklist:[
        'Language' // To avoid saving languages locally
    ]
};

const rootReducer = combineReducers({Main:mainReducer,Tasks:taskReducer,Timetable:lessonReducer,Language:languageReducer});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);;
export const persistor = persistStore(store);