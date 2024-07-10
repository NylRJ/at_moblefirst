import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel } from '@material-ui/core';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

const EmpresaForm = ({ empresaId, onSubmit }) => {
    const [empresa, setEmpresa] = useState({
        nome: '',
        cnpj: '',
        site: '',
        endereco: '',
        fornecedor: false,
        representante: {
            nome: '',
            cargo: '',
            telefone: '',
            email: ''
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmpresa((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRepresentanteChange = (e) => {
        const { name, value } = e.target;
        setEmpresa((prev) => ({
            ...prev,
            representante: {
                ...prev.representante,
                [name]: value
            }
        }));
    };

    const handleFornecedorChange = (e) => {
        setEmpresa((prev) => ({
            ...prev,
            fornecedor: e.target.checked
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (empresaId) {
                await updateDoc(doc(db, "empresas", empresaId), empresa);
            } else {
                await addDoc(collection(db, "empresas"), empresa);
            }
            onSubmit(empresa);
        } catch (e) {
            console.error("Erro ao adicionar/atualizar empresa: ", e);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField name="nome" label="Nome da Empresa" value={empresa.nome} onChange={handleChange} fullWidth />
            <TextField name="cnpj" label="CNPJ" value={empresa.cnpj} onChange={handleChange} fullWidth />
            <TextField name="site" label="Site" value={empresa.site} onChange={handleChange} fullWidth />
            <TextField name="endereco" label="Endereço" value={empresa.endereco} onChange={handleChange} fullWidth />
            <FormControlLabel
                control={<Checkbox checked={empresa.fornecedor} onChange={handleFornecedorChange} />}
                label="Fornecedor"
            />
            <TextField name="nome" label="Nome do Representante" value={empresa.representante.nome} onChange={handleRepresentanteChange} fullWidth />
            <TextField name="cargo" label="Cargo" value={empresa.representante.cargo} onChange={handleRepresentanteChange} fullWidth />
            <TextField name="telefone" label="Telefone" value={empresa.representante.telefone} onChange={handleRepresentanteChange} fullWidth />
            <TextField name="email" label="Email" value={empresa.representante.email} onChange={handleRepresentanteChange} fullWidth />
            <Button type="submit" variant="contained" color="primary">Salvar</Button>
        </form>
    );
};

export default EmpresaForm;
