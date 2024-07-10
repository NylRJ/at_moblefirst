import React from 'react';
import EmpresaForm from '../components/EmpresaForm';
import PageTransition from '../components/PageTransition';
import { useParams } from 'react-router-dom';

const CadastroEmpresa = () => {
    const { id } = useParams();
    const handleSubmit = (empresa) => {
        console.log("Empresa cadastrada/atualizada: ", empresa);
    };

    return (
        <PageTransition>
            <h1>{id ? 'Editar Empresa' : 'Cadastro de Empresa'}</h1>
            <EmpresaForm onSubmit={handleSubmit} />
        </PageTransition>
    );
};

export default CadastroEmpresa;
