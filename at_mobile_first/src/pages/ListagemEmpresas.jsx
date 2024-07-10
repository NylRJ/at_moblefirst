import React from 'react';
import EmpresaList from '../components/EmpresaList';
import PageTransition from '../components/PageTransition';

const ListagemEmpresas = () => {
    return (
        <PageTransition>
            <h1>Listagem de Empresas</h1>
            <EmpresaList />
        </PageTransition>
    );
};

export default ListagemEmpresas;
