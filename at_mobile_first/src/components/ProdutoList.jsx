import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProdutoList = () => {
    const [produtos, setProdutos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProdutos = async () => {
            const produtosSnapshot = await getDocs(collection(db, 'produtos'));
            const produtosList = produtosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProdutos(produtosList);
        };

        fetchProdutos();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Foto</TableCell>
                        <TableCell>Nome do Produto</TableCell>
                        <TableCell>Nome da Empresa</TableCell>
                        <TableCell>Valor</TableCell>
                        <TableCell>Categoria</TableCell>
                        <TableCell>Detalhes</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {produtos.map((produto) => (
                        <TableRow key={produto.id}>
                            <TableCell>
                                <img src={produto.imagem} alt={produto.nome} width={50} />
                            </TableCell>
                            <TableCell>{produto.nome}</TableCell>
                            <TableCell>
                                <Button onClick={() => navigate(`/detalhes-empresa/${produto.empresas[0].id}`)}>
                                    {produto.empresas[0].nome}
                                </Button>
                            </TableCell>
                            <TableCell>{produto.valor}</TableCell>
                            <TableCell>{produto.categoria.nome}</TableCell>
                            <TableCell>
                                <Button onClick={() => navigate(`/detalhes-produto/${produto.id}`)}>
                                    Ver Detalhes
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProdutoList;
