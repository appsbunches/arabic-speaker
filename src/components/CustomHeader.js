import React, { Component } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput
} from "react-native";
// import { Icon } from 'expo';
import Colors from "../constants/Colors";
import { MonoText } from '../components/StyledText';
import Icon from 'react-native-vector-icons/FontAwesome';

class CustomHeader extends Component {
    constructor (props) {
        super();

      }
    
    render() {
        return (
            <View style={styles.container}> 
            <View style={styles.iconsWrapper}>
            {
                this.props.onBackClicked ? 
                <TouchableOpacity  style={styles.backWrapper} onPress={ this.props.onBackClicked} > 
                <Icon name="chevron-right" size={24} color="white" />
                    <MonoText  style={styles.smallText}> للخلف </MonoText> 
                </TouchableOpacity> :
                <Icon name="bars" size={28} color="white" onPress={() => this.props.navigation.openDrawer()} />  
            }
            {/* <Image source= {require( '../../assets/images/icons/menu.png')}/> */}
    
            <View style={styles.tools}>
            {/* didn't work <Icon.Ionicons name="circle-with-plus" size={28}  style={{ textAlign: 'right' }} color="white" />   */}
          
            {
                this.props.onSelectClicked ? 
                <TouchableOpacity activeOpacity = { .5 }  onPress = {this.props.onSelectClicked}>
                <Icon style={styles.icon}  name="check-circle" size={28}  color="white"/>  
                {/* <Image  source={require( '../../assets/images/icons/checkmark-circle.png')} /> */}
                </TouchableOpacity>: null
            }
            {
                this.props.onSecondNewClicked ?  <TouchableOpacity activeOpacity = { .5 }  onPress = {this.props.onSecondNewClicked}>
            <Icon style={styles.icon}  name="plus-square" size={28}  color="white"/> 
            {/* <Image style={styles.icon} source={require( '../../assets/images/icons/plus.png')} />      */}
            </TouchableOpacity>   : null
            }
            {
                this.props.onNewClicked ?  <TouchableOpacity activeOpacity = { .5 }  onPress = {this.props.onNewClicked}>
            <Icon style={styles.icon}  name="plus-circle" size={28}  color="white"/> 
            {/* <Image style={styles.icon} source={require( '../../assets/images/icons/plus.png')} />      */}
            </TouchableOpacity>   : null
            }

            </View>
     

            </View>
            <View  />

                 { this.props.title ? 
                 
          <View style={styles.titleSectionsWrapper}>
          {
            this.props.title.map((titleSection, index) => {
              return(
                  <View style={{flexDirection: 'row'}}>
                  {/* , alignItems: 'center' to fix arrow */}
                      <TouchableOpacity
                      activeOpacity = {   this.props.onTitleSectionClicked ? 0.2 : 1}
                  onPress={
                    //   () =>  this.props.navigation.navigate( {
                    //   routeName: 'CategoriesScreen',
                    //   params: {
                    //       categoryPath: this.props.title.slice(0, index + 1)
                    //   },
                    //   key: 'CategoriesScreen' + index })
                        this.props.onTitleSectionClicked ? ()=> {this.props.onTitleSectionClicked(index)} : null
                      } >
              <MonoText style={styles.title}>
                {titleSection}
                </MonoText>
                </TouchableOpacity>
                {this.props.title[ index + 1 ] ? <Icon  name="angle-left" style = {styles.titleArrow}/> 

                : null}

             </View>
               )})}
            </View>
            
            : null}


            {/* search */}

              {
                   this.props.isSearchable ?
               
               <View style={styles.searchContainer}>
                               <Icon style={[styles.icon, styles.searchIcon]}  name="search" size={17}  color="white"/>  

                       <TextInput
                       placeholderTextColor= {'white'}
                       style={styles.searchInput} onChangeText={(text) => this.props.filterContent(text)}
                   placeholder= { 'بحث' } /> 
               </View>
                   : null

              }
            {/* style={{ flex: 0.5}} */}
          </View>
            // <Header style={styles.header}
            // rightComponent={
            //     <View>
            //   <Icon.Ionicons
            //     name="md-menu"
            //             size={28}
            //            style={{ marginBottom: -3 }}
            //            color="white"
            //         //    onPress={() => this.props.drawerOpen()}
            //          />            
            //          <UniversalText>{this.props.title}</UniversalText>
            //          </View>
            //          }>
                
                      
            //         {/* <Ionicons name="md-checkmark-circle" size={28} color="green
            //     " onPress={() => this.props.drawerOpen()} /> */}
         
            // </Header>
        );
    }
}
export default CustomHeader;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.brand,
        // height: 116
    },
    titleSectionsWrapper: {
        flexDirection: 'row',
        //  justifyContent: 'flex-start',
        //  marginRight: 13
        marginLeft: 13 // everything is the opposite
    },
    title : {
        height: 47,
        color: Colors.primary,
        fontSize: 30
      },
      titleArrow: {
        color: 'white',
        fontSize: 24,
        margin: 6
      },
iconsWrapper: {
    height: 74,
      paddingTop: 36,
      paddingBottom: 12,
        marginLeft: 13, // was horizantal
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    tools: {
        flexDirection: 'row',  
    },
    icon: {
        paddingHorizontal: 15 /* weird */
    },
    backWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    smallText: {
        fontSize: 17,
        color: 'white'
    },
    searchContainer: {
        backgroundColor:  'rgba(0, 0, 0, 0.18)',
        width: 342,
        marginBottom: 11,
        // flexDirection: 'row',
        // justifyContent: 'center',
        borderRadius: 10 /* **N** */,
        paddingLeft: 40,
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    searchInput: {
        height: 36,
        backgroundColor: 'transparent',
        color: 'white',
        fontFamily: 'Tajawal',
        fontSize: 17,
        textAlign: 'right',
   
        // padding: 8,
        // paddingTop: 12, // 20 didn't work
      },
      searchIcon: {
          position: 'absolute',
        // left: 4,
        top: 6
      }
});
  