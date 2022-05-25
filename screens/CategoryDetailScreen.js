import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import SkillFeed from '../components/SkillFeed'

export default function CategoryDetailScreen({ route, navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Text>CategoryDetailScreen</Text>
            <Text>route name: {route.params}</Text>
            <SkillFeed skill={route.params} />
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: 'red',
        borderWidth: 1,
        borderStyle: 'solid',
    }
});