import React from 'react';
import FornecedorForm from '../components/FornecedorForm';
import PageTransition from '../components/PageTransition';

const CadastroFornecedor = () => {
    const handleSubmit = (fornecedor) => {
        console.log("Fornecedor cadastrado: ", fornecedor);
    };

    return (
        <PageTransition>
            <h1>Cadastro de Fornecedor</h1>
            <FornecedorForm onSubmit={handleSubmit} />
        </PageTransition>
    );
};

export default CadastroFornecedor;
