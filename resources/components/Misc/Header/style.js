import {Platform,StyleSheet} from 'react-native';

const style = StyleSheet.create(
    {
        header:{
            color:'rgb(56, 62, 83)',
            fontSize:22,
            marginTop:Platform.OS === 'ios' ? 30 : 0
        },
        description:{
            fontSize:16,
            color:'rgb(114, 123, 150)',
            marginBottom:20
        }
    }
);

export default style;