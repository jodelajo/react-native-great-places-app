import React from 'react'
import { Text, View, StyleSheet, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'


import CustomHeaderButton from '../components/HeaderButton'


export default function PlacesListScreen({ navigation }) {
    return <View><Text>PlacesListScreen</Text></View>
}

export const screenOptionsList = navData => {
    return {
        headerTitle: 'All Places',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title="All Places"
                iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                onPress={() => 
                navData.navigation.navigate('NewPlace')}
                />
            </HeaderButtons>
        )
    }
}


const styles=StyleSheet.create({

})
