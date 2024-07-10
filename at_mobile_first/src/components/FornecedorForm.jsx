import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const FornecedorForm = ({ onSubmit }) => {
    const [fornecedor, setFornecedor] = useState({
        nome: '',
        razaoSocial: '',
        nomeFantasia: '',
        cnpj: '',
        site: '',
        endereco: '',
        contato: {
            nomeRepresentante: '',
            cargo: '',
            telefone: '',
            email: ''
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFornecedor((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleContatoChange = (e) => {
        const { name, value } = e.target;
        setFornecedor((prev) => ({
            ...prev,
            contato: {
                ...prev.contato,
                [name]: value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "fornecedores"), fornecedor);
            onSubmit(fornecedor);
        } catch (e) {
            console.error("Erro ao adicionar fornecedor: ", e);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField name="nome" label="Nome" value={fornecedor.nome} onChange={handleChange} fullWidth />
            <TextField name="razaoSocial" label="Razão Social" value={fornecedor.razaoSocial} onChange={handleChange} fullWidth />
            <TextField name="nomeFantasia" label="Nome Fantasia" value={fornecedor.nomeFantasia} onChange={handleChange} fullWidth />
            <TextField name="cnpj" label="CNPJ" value={fornecedor.cnpj} onChange={handleChange} fullWidth />
            <TextField name="site" label="Site" value={fornecedor.site} onChange={handleChange} fullWidth />
            <TextField name="endereco" label="Endereço" value={fornecedor.endereco} onChange={handleChange} fullWidth />
            <TextField name="nomeRepresentante" label="Nome do Representante" value={fornecedor.contato.nomeRepresentante} onChange={handleContatoChange} fullWidth />
            <TextField name="cargo" label="Cargo" value={fornecedor.contato.cargo} onChange={handleContatoChange} fullWidth />
            <TextField name="telefone" label="Telefone" value={fornecedor.contato.telefone} onChange={handleContatoChange} fullWidth />
            <TextField name="email" label="Email" value={fornecedor.contato.email} onChange={handleContatoChange} fullWidth />
            <Button type="submit" variant="contained" color="primary">Salvar</Button>
        </form>
    );
};

export default FornecedorForm;
