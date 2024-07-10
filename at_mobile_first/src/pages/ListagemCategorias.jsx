import React from 'react';
import CategoriaList from '../components/CategoriaList';
import PageTransition from '../components/PageTransition';

const ListagemCategorias = () => {
    return (
        <PageTransition>
            <h1>Listagem de Categorias</h1>
            <CategoriaList />
        </PageTransition>
    );
};

export default ListagemCategorias;
