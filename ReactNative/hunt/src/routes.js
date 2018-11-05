import { createStackNavigator } from 'react-navigation';

import Main from './pages/main';
import Product from './pages/product';

export default createStackNavigator({
    Main, Product
}, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: "#DA552F",
        },
        headerTintColor: "#FFF"
    },
});