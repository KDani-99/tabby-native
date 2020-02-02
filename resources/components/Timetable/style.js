import {StyleSheet} from 'react-native';

const style = StyleSheet.create(
    {
        container:{
            display:'flex',
            flex:1
        },
        containerInner:{
            display:'flex',
            flex:1
        },
        wrapper:{
            padding:15,
            paddingBottom:0
        },
        taskBtn:{
            position:'absolute',
            bottom:15,
            right:15,
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            overflow:'hidden',
            borderRadius:100,
            width:50,
            height:50,
            elevation:5
        },
        editContainer:{
            position:'absolute',
            left:0,
            top:0,
            display:'flex',
            flexDirection:'row',
            width:'100%',
            height:'100%',
            justifyContent:'center',
            alignItems:'center'
        }
    }
);

export default style;