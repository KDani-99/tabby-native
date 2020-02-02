import {StyleSheet} from 'react-native';

const style = StyleSheet.create(
    {
        outerContainer:{
            display:'flex',
            backgroundColor:'red',
            borderRadius:4,
            marginBottom:10,
            elevation:0.75,
            borderBottomWidth:1,
            borderBottomColor:'rgba(200,200,200,0.5)',
            backgroundColor:'rgba(249,249,249,1)',
        },
        container:{
            position:'relative',
            backgroundColor:'rgba(249,249,249,1)',
            zIndex:10,
            display:'flex',
            padding:10,
            borderRadius:4,
            overflow:'hidden'
        },
        space:{
            marginBottom:10
        },
        text:{
            marginTop:5
        },
        header:{

        },
        room:{
            display:'flex',
            flexDirection:'row',
            alignItems:'center'
        },
        headerContainer:{
            display:'flex',
            justifyContent:'space-between',
            flexDirection:'row'
        },
        mark:{
            width:15,
            height:15,
            borderRadius:100,
            elevation:3
        },
        iconContainer:{
            left:0,
            display:'flex',
            width:38,
            height:38,
            alignItems:'center',
            justifyContent:'center',
            alignSelf:'flex-end',
            marginRight:'auto',
            borderRadius:4
        },
        innerBg:{
            position:'absolute',
            width:38,
            height:38,
            borderRadius:4,
            opacity:0.15,
        },
        row:{
            display:'flex',
            height:'100%',
            width:'40%',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center'
        },
        rowBg:{
            position:'absolute',
            left:0,
            top:0,
            width:'100%',
            height:'100%',
            opacity:0.1,
            borderRadius:4
        },
        rowText:{
            alignSelf:'center',
            marginRight:'auto'
        },
        activityButtonContainer:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-evenly',
            height:38,
            marginBottom:5,
            marginTop:5
        }
    }
);

export default style;