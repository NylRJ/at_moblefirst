import React from 'react';
import ProdutoList from '../components/ProdutoList';
import PageTransition from '../components/PageTransition';

const ListagemProdutos = () => {
    return (
        <PageTransition>
            <h1>Listagem de Produtos</h1>
            <ProdutoList />
        </PageTransition>
    );
};

export default ListagemProdutos;
