import React, { Component } from "react";

import './styles.css';

import api from "../../services/api";

export default class Main extends Component {
    
    // Variaveis de estado.
    // Quando uma das variaveis mudam, ele manda executar o render novamente.
    state = {
        products: [],
        productInfo: {},
        page: 1,
    };
    
    // Método executa assim que o componente é exibido na tela.
    componentDidMount() {
        this.loadProducts();
    };

    loadProducts = async (page = 1) => {
        const response = await api.get("/products?page="+page);
        
        const { docs, ...productInfo } = response.data;

        // Modificando variaveis de estado.
        this.setState({ products: docs, productInfo: productInfo, page: page });
    };

    prevPage = () => {
        const { page, productInfo } = this.state;
        
        if (page === 1) return;

        const pageNumber = page - 1;
        this.loadProducts(pageNumber);
    };

    nextPage = () => {
        const { page, productInfo } = this.state;
        if (page === productInfo.pages) return;

        const pageNumber = page + 1;
        this.loadProducts(pageNumber);

    };
    

    render() {
        const { products, page, productInfo } = this.state;

        return (
            <div className="products-list">
                { products.map(product => (
                    <article key={ product._id } >
                        <strong>{ product.title }</strong>
                        <p>{ product.description }</p>
                        <a href="" >Acessar</a>
                    </article>
                )) }
                <div className="actions">
                    <button disabled={ page === 1 } onClick={ this.prevPage } >Anterior</button>
                    <button disabled={ productInfo.pages === page } onClick={ this.nextPage } >Próximo</button>
                </div>
            </div>
        );
    }
}