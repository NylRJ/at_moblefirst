import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const CategoriaList = () => {
    const [categorias, setCategorias] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategorias = async () => {
            const categoriasSnapshot = await getDocs(collection(db, 'categorias'));
            const categoriasList = categoriasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCategorias(categoriasList);
        };

        fetchCategorias();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'categorias', id));
            setCategorias(categorias.filter((categoria) => categoria.id !== id));
            toast.success('Categoria excluída com sucesso!');
        } catch (e) {
            toast.error('Erro ao excluir categoria!');
            console.error("Erro ao excluir categoria: ", e);
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nome da Categoria</TableCell>
                        <TableCell>Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categorias.map((categoria) => (
                        <TableRow key={categoria.id}>
                            <TableCell>{categoria.id}</TableCell>
                            <TableCell>{categoria.nome}</TableCell>
                            <TableCell>
                                <Button onClick={() => navigate(`/cadastro-categoria/${categoria.id}`)}>Editar</Button>
                                <Button onClick={() => handleDelete(categoria.id)}>Excluir</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CategoriaList;
