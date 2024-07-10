import React from 'react';
import ProdutoForm from '../components/ProdutoForm';
import PageTransition from '../components/PageTransition';

const CadastroProduto = () => {
    const handleSubmit = (produto) => {
        console.log("Produto cadastrado: ", produto);
    };

    return (
        <PageTransition>
            <h1>Cadastro de Produto</h1>
            <ProdutoForm onSubmit={handleSubmit} />
        </PageTransition>
    );
};

export default CadastroProduto;
