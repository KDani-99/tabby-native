const taskState = {
    tasks:[]
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
        case 'PURGE':
            return taskState;
        default:
            return state;
    }
};

export default taskReducer;