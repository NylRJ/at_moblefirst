import React from 'react';
import EmpresaDetails from '../components/EmpresaDetails';
import PageTransition from '../components/PageTransition';

const DetalhesEmpresa = () => {
    return (
        <PageTransition>
            <h1>Detalhes da Empresa</h1>
            <EmpresaDetails />
        </PageTransition>
    );
};

export default DetalhesEmpresa;
