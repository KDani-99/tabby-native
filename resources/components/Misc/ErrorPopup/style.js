import {StyleSheet,Platform} from 'react-native';

const style = StyleSheet.create(
    {
        container:{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            position:'absolute',
            width:'100%',
            top:Platform.OS === 'ios' ? 40 : 0,
            left:0,
            backgroundColor:'white',
            zIndex:100,
            elevation:5,
        },
        innerContainer:{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            padding:15
        },
        text:{
            marginLeft:5,
            marginRight:30
        },
        showProgress:{
            position:'absolute',
            width:'100%',
            left:0,
            bottom:0,
            height:5,
            backgroundColor:'#e74c3c'
        }
    }
);

export default style;