import {StyleSheet} from 'react-native';

const style = StyleSheet.create(
    {
       container:{
           display:'flex',
           height:'auto',
           padding:15,
           paddingRight:10,        
           backgroundColor:'white',
           borderRadius:4,
           borderWidth:1,
           borderColor:'rgba(0, 0, 0, .38)',
           marginBottom:10
       },
       header:{
           fontSize:16,
           color:'rgba(0, 0, 0, .38)'
       },
       dropdown:{
           display:'flex',
           backgroundColor:'red',
           backgroundColor:'white',
           borderRadius:4,
           elevation:10,
           zIndex:100,
           maxHeight:200,
           marginBottom:10
       },
       dropItem:{
           padding:15
       }
    }
);

export default style;