const initialState = {
    selectedTheme:'rgb(3,102,252)',
    selectedLanguage:'en',
    selectedWeek:'A',
    error:null
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
        case 'PURGE':
            return initialState;
        default:
            return state;
    }
};

export default mainReducer;