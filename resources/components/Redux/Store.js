import {createStore,combineReducers} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {updateIn} from 'seamless-immutable';
/* Localization */
import en from '../../languages/en.json';
import hu from '../../languages/hu.json';

const initialState = {
    selectedTheme:'rgb(3,102,252)',
    selectedLanguage:'en',
    languages:{
        en,
        hu
    },
    selectedWeek:'A',
    error:null
};

const taskState = {
    tasks:[]
};

const timetableState = {
    weeks:{}
};

const mainReducer = (state = initialState,action) => {
    switch(action.type)
    {
        case 'error::show':
            return {
                ...state,
                error:action.error
            };
        case 'error::hide':
            return {
                ...state,
                error:null
            };
        case 'settings::save':
            return {
                ...state,
                ...action.settings
            };
        default:
            return state;
    }
};


const taskReducer = (state = taskState,action) => {
    switch(action.type)
    {
        case 'task::save':
            return {
                ...state,
                tasks:[...state.tasks,action.task]
            };
        case 'task::remove':
            return {
                ...state,
                tasks:[
                    ...state.tasks.slice(0, action.index),
                    ...state.tasks.slice(action.index+1)
                ]
            };
        case 'task::complete':
            return {
                ...state,
                tasks:[
                    ...state.tasks.slice(0, action.index),
                    {
                        ...state.tasks[action.index],
                        completed:action.value
                    },
                    ...state.tasks.slice(action.index+1),
                ]
            };
        default:
            return state;
    }
};

const lessonReducer = (state = timetableState,action) => {
    switch(action.type)
    {
        case 'lesson::save':
            return updateIn(state,['weeks',action.week,action.day],(elem) => {
                if(!Array.isArray(elem))
                    return [action.data];
                else
                {
                    let index = elem.findIndex(elem => elem.startTime > action.data.startTime);
                    if(index === -1)
                        return [...elem,action.data];
                    else
                        return [
                            ...elem.slice(0,index),
                            {
                                ...action.data
                            },
                            ...elem.slice(index,elem.length)
                        ];
                }
            });
        case 'lesson::edit':
            return {
                weeks:
                {
                    ...state.weeks,
                    [action.week]:{
                        ...state.weeks[action.week],
                        [action.day]:[
                            ...state.weeks[action.week][action.day].slice(0,action.index),
                            {
                                ...action.data
                            },
                            ...state.weeks[action.week][action.day].slice(action.index+1)
                        ]
                    }
                }
            };
        case 'lesson::delete':          
            if(state.weeks[action.week][action.day].length-1 === 0)
            {
                if(Object.keys(state.weeks[action.week]).length-1 === 0)
                {
                    let {[action.week]:nullValue,...removedWeek} = state.weeks;
                    return {
                        weeks:{
                            ...removedWeek
                        }
                    }
                }
                let {[action.day]:nullValue,...removedDay} = state.weeks[action.week];
                return {
                    weeks:{
                        ...state.weeks,
                        [action.week]:{
                            ...removedDay
                        }
                    }
                };
            }
            else
                return updateIn(state,['weeks',action.week,action.day],(elem) => {
                    return [
                        ...elem.slice(0,action.index),
                        ...elem.slice(action.index+1)
                    ]
                });
        default:
            return state;
    }
};

const persistConfig = {
    key: 'root5.0122',
    storage:AsyncStorage,
};

const rootReducer = combineReducers({Main:mainReducer,Tasks:taskReducer,Timetable:lessonReducer});

//const store = createStore(rootReducer);

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);;
export const persistor = persistStore(store);