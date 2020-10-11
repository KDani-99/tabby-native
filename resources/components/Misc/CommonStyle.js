import {Platform,StyleSheet} from 'react-native';

const style = StyleSheet.create(
    {
        textLight:{
            fontFamily:'Roboto-Light'
        },  
        text:{
            fontFamily:'Roboto'
        },
        textMedium:{
            fontFamily:'Roboto-Medium'
        },
        textBold:{
            fontFamily:'Roboto-Regular',
            fontSize:20
        },
        textHeader:{
            fontFamily:Platform.OS === 'ios' ? 'Fredoka One' : 'Fredoka'
        }
    }
);

export default style;