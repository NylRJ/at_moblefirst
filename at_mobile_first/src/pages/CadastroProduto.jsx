import React from 'react';
import ProdutoForm from '../components/ProdutoForm';
import PageTransition from '../components/PageTransition';
import { useParams } from 'react-router-dom';

const CadastroProduto = () => {
    const { id } = useParams();
    const handleSubmit = (produto) => {
        console.log("Produto cadastrado/atualizado: ", produto);
    };

    return (
        <PageTransition>
            <h1>{id ? 'Editar Produto' : 'Cadastro de Produto'}</h1>
            <ProdutoForm onSubmit={handleSubmit} />
        </PageTransition>
    );
};

export default CadastroProduto;
