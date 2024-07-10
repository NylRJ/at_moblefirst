import React from 'react';
import CategoriaForm from '../components/CategoriaForm';
import PageTransition from '../components/PageTransition';

const CadastroCategoria = () => {
    const handleSubmit = (categoria) => {
        console.log("Categoria cadastrada: ", categoria);
    };

    return (
        <PageTransition>
            <h1>Cadastro de Categoria</h1>
            <CategoriaForm onSubmit={handleSubmit} />
        </PageTransition>
    );
};

export default CadastroCategoria;
