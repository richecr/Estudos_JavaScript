import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

export default class Deputados extends Component {

    state = {
        deputados : [],
        page : 1,
        infor : {},
    }

    async componentDidMount() {
        await this.acessaApi();
        console.log(this.state.infor);
    }

    async acessaApi(page = 1) {
        const response = await axios.get('https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome&pagina=' + page + '&itens=100');
        const { dados, ...resto } = response.data;
        
        this.setState({ deputados : dados, page : page, infor : resto } );
    }

    prevPage = () => {
        const { page, infor } = this.state;

        if (page == 1) return;
        
        const pageNumber = page - 1;
        this.acessaApi(pageNumber);
    }

    nextPage = () => {
        const { page, infor } = this.state;

        if (page == 6) return;

        const pageNumber = page + 1;
        this.acessaApi(pageNumber);
    }

    render() {
        const { deputados, page } = this.state;
        
        return (
            <div>
                { deputados.map(deputado => (
                    <article key={ deputado.id }>
                        <strong>{ deputado.nome }</strong>
                        <p>{ deputado.siglaPartido }</p>
                        <Link to={"/deputado/"+deputado.id}>Page</Link>
                    </article>
                )) }
                <div>
                    <button disabled={ page == 1 } onClick={ this.prevPage } >Anterior</button>
                    <button disabled={ page == 6 } onClick={ this.nextPage } >Próxima</button>
                </div>
            </div>
        )
    }
}