import React, { Component } from "react";

import api from "../../services/api";

export default class Main extends Component {
    
    // Variaveis de estado.
    // Quando uma das variaveis mudam, ele manda executar o render novamente.
    state = {
        products: [],
    };
    
    // Método executa assim que o componente é exibido na tela.
    componentDidMount() {
        this.loadProducts();
    };

    loadProducts = async () => {
        const response = await api.get("/products");
        
        // Modificando variaveis de estado.
        this.setState({ products: response.data.docs });
    };

    render() {
        return (
            <div className="products-list">
                { this.state.products.map(product => (
                    <h2 key={ product._id } >{ product.title }</h2>
                )) }
            </div>
        );
    }
}