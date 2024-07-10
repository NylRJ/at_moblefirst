import React from 'react';
import CategoriaForm from '../components/CategoriaForm';
import PageTransition from '../components/PageTransition';
import { useParams } from 'react-router-dom';

const CadastroCategoria = () => {
    const { id } = useParams();
    const handleSubmit = (categoria) => {
        console.log("Categoria cadastrada/atualizada: ", categoria);
    };

    return (
        <PageTransition>
            <h1>{id ? 'Editar Categoria' : 'Cadastro de Categoria'}</h1>
            <CategoriaForm onSubmit={handleSubmit} />
        </PageTransition>
    );
};

export default CadastroCategoria;
