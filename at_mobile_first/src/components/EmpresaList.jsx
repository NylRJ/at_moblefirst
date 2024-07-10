import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const EmpresaList = () => {
    const [empresas, setEmpresas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmpresas = async () => {
            const empresasSnapshot = await getDocs(collection(db, 'empresas'));
            const empresasList = empresasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setEmpresas(empresasList);
        };

        fetchEmpresas();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'empresas', id));
            setEmpresas(empresas.filter((empresa) => empresa.id !== id));
            toast.success('Empresa excluída com sucesso!');
        } catch (e) {
            toast.error('Erro ao excluir empresa!');
            console.error("Erro ao excluir empresa: ", e);
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nome da Empresa</TableCell>
                        <TableCell>CNPJ</TableCell>
                        <TableCell>Site</TableCell>
                        <TableCell>Endereço</TableCell>
                        <TableCell>Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {empresas.map((empresa) => (
                        <TableRow key={empresa.id}>
                            <TableCell>{empresa.id}</TableCell>
                            <TableCell>{empresa.nome}</TableCell>
                            <TableCell>{empresa.cnpj}</TableCell>
                            <TableCell><a href={empresa.site} target="_blank" rel="noopener noreferrer">{empresa.site}</a></TableCell>
                            <TableCell>{empresa.endereco}</TableCell>
                            <TableCell>
                                <Button onClick={() => navigate(`/cadastro-empresa/${empresa.id}`)}>Editar</Button>
                                <Button onClick={() => handleDelete(empresa.id)}>Excluir</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default EmpresaList;
