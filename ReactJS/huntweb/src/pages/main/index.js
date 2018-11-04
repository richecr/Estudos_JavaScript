import React, { Component } from "react";

import './styles.css';

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
        const { products } = this.state;

        return (
            <div className="products-list">
                { products.map(product => (
                    <article key={ product._id } >
                        <strong>{ product.title }</strong>
                        <p>{ product.description }</p>
                        <a href="" >Acessar</a>
                    </article>
                )) }
            </div>
        );
    }
}