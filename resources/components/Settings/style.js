import {StyleSheet} from 'react-native';

const style = StyleSheet.create(
    {
        container:{
            padding:15
        },
        themeContainer:{
            width:'100%',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'row',
            marginTop:10,
            justifyContent: 'space-between'
        },
        themeButton:{
            width:50,
            height:50,
            borderRadius:100,
            elevation:5,
            overflow:'hidden'
        },
        language:{
            width:'100%',
            display:'flex',
            flexDirection:'row',
            borderRadius:4,
            padding:10,
            justifyContent:'space-between',
            overflow:'hidden'
        },
        languageText:{
            fontSize:16
        },
        deleteSaves:{
            display:'flex',
            alignItems:'center',
            flexDirection:'row',
            width:'100%',
            padding:15,
            borderRadius:4,
            overflow:'hidden',
            backgroundColor:'rgba(255,0,0,0.075)',
            borderBottomColor:'rgba(255,0,0,0.25)',
            borderBottomWidth:2
        },
        deleteSavesText:{
            color:'red',
            justifyContent:'center',
            marginLeft:'auto',
            marginRight:'auto'
        },
        git:{
            backgroundColor:'rgba(110, 84, 148,0.1)',
            borderBottomColor:'rgba(110, 84, 148,0.25)',
            marginTop:10
        },
        weekDropdown:{
            marginBottom:0
        },
        weekDropdownText:{
            fontFamily:'Roboto-Light',
            color:'black'
        }
    }
);

export default style;