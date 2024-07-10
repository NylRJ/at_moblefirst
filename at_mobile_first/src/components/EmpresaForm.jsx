import React, { useState, useEffect } from 'react';
import { TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from 'react-router-dom';

const EmpresaForm = ({ onSubmit }) => {
    const { id } = useParams();
    const navigate = useNavigate();
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

    useEffect(() => {
        if (id) {
            const fetchEmpresa = async () => {
                const empresaDoc = await getDoc(doc(db, 'empresas', id));
                if (empresaDoc.exists()) {
                    setEmpresa(empresaDoc.data());
                }
            };
            fetchEmpresa();
        }
    }, [id]);

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
            if (id) {
                await updateDoc(doc(db, "empresas", id), empresa);
                toast.success('Empresa atualizada com sucesso!');
            } else {
                await addDoc(collection(db, "empresas"), empresa);
                toast.success('Empresa salva com sucesso!');
            }
            onSubmit(empresa);
            navigate('/listagem-empresas'); // Redireciona para a página de listagem de empresas
        } catch (e) {
            toast.error('Erro ao salvar empresa!');
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
