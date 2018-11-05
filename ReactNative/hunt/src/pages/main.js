import React, { Component } from 'react';
import { View, Text } from "react-native";

import api from '../services/api';

export default class Main extends Component {
    static navigationOptions = {
        title: "JSHunt",
    };

    state = {
        docs: [],
    };

    componentDidMount() {
        this.loadProducts();
    };

    loadProducts = async () => {
        const response = await api.get("/products");

        const { docs } = response.data;

        this.setState({ docs: docs });
    };

    render() {
        return (
            <View>
                <Text>Page Main!</Text>
                {this.state.docs.map(doc => (
                    <Text>{ doc.title }</Text>
                ))}
            </View>
        );
    };
}