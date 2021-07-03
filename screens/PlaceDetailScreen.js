import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default function PlaceDetailScreen() {
    return <View><Text>PlaceDetailScreen</Text></View>
}



export const screenOptionsDetails = navData => {
    return {
        headerTitle: 'Place details',
        // headerRight: () => (
        //     <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        //         <Item title="All Places"
        //         iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
        //         onPress={() => 
        //         navData.navigation.navigate('NewPlace')}
        //         />
        //     </HeaderButtons>
        // )
    }
}

const styles=StyleSheet.create({

})