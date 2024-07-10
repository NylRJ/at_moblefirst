import React from 'react';
import ProdutoDetails from '../components/ProdutoDetails';
import PageTransition from '../components/PageTransition';

const DetalhesProduto = () => {
    return (
        <PageTransition>
            <h1>Detalhes do Produto</h1>
            <ProdutoDetails />
        </PageTransition>
    );
};

export default DetalhesProduto;
