import {StyleSheet} from 'react-native';

const LoaderStyle = StyleSheet.create(
    {
        container:{
            flex:1,
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
        },
        text:{
            marginTop:15
        },
        version:{
            fontSize:10
        }
    }
);

export default LoaderStyle;