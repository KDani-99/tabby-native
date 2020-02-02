import {StyleSheet} from 'react-native';

const MenuStyle = StyleSheet.create(
    {
        menu:{
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'red',
            width:'100%',
            height:65,
            flexDirection:'row',
            justifyContent: 'space-between',
            elevation: 5
        },
        menuButton:{
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            flex:1,
            height:65,
            backgroundColor:'rgb(249,249,249)',
            
        },
        menuText:{
            color:'rgb(56, 62, 83)'
        },
    }
);

export default MenuStyle;