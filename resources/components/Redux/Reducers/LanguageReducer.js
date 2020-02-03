const initialLanguageState = {
    languages:[
    ]
};

const languageReducer = (state = initialLanguageState,action) => {
    switch(action.type)
    {
        case 'language::load':
            return {
                ...state,
                languages:[
                    ...action.languages
                ]
            };
        default:
            return state;
    }
};

export default languageReducer;