import React from 'react';
import EmpresaForm from '../components/EmpresaForm';
import PageTransition from '../components/PageTransition';

const CadastroEmpresa = () => {
    const handleSubmit = (empresa) => {
        console.log("Empresa cadastrada/atualizada: ", empresa);
    };

    return (
        <PageTransition>
            <h1>Cadastro de Empresa</h1>
            <EmpresaForm onSubmit={handleSubmit} />
        </PageTransition>
    );
};

export default CadastroEmpresa;
