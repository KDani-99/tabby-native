import {updateIn} from 'seamless-immutable';

const timetableState = {
    weeks:{
        A:{

        }
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
                if(Object.keys(state.weeks[action.week]).length-1 === 0 && action.week !== 'A')
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
        case 'PURGE':
            return timetableState;
        default:
            return state;
    }
};

export default lessonReducer;