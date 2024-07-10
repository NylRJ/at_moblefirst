import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProdutoList = () => {
    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [empresas, setEmpresas] = useState([]);
    const [filtroCategoria, setFiltroCategoria] = useState('');
    const [filtroEmpresa, setFiltroEmpresa] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProdutos = async () => {
            let q = query(collection(db, 'produtos'));
            if (filtroCategoria) {
                q = query(q, where('categoria.id', '==', filtroCategoria));
            }
            if (filtroEmpresa) {
                q = query(q, where('empresas', 'array-contains', { id: filtroEmpresa }));
            }
            const produtosSnapshot = await getDocs(q);
            const produtosList = produtosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProdutos(produtosList);
        };

        const fetchCategorias = async () => {
            const categoriasSnapshot = await getDocs(collection(db, 'categorias'));
            const categoriasList = categoriasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCategorias(categoriasList);
        };

        const fetchEmpresas = async () => {
            const empresasSnapshot = await getDocs(collection(db, 'empresas'));
            const empresasList = empresasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setEmpresas(empresasList);
        };

        fetchProdutos();
        fetchCategorias();
        fetchEmpresas();
    }, [filtroCategoria, filtroEmpresa]);

    const handleCategoriaChange = (e) => {
        setFiltroCategoria(e.target.value);
    };

    const handleEmpresaChange = (e) => {
        setFiltroEmpresa(e.target.value);
    };

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'produtos', id));
            setProdutos(produtos.filter((produto) => produto.id !== id));
            toast.success('Produto excluído com sucesso!');
        } catch (e) {
            toast.error('Erro ao excluir produto!');
            console.error("Erro ao excluir produto: ", e);
        }
    };

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <TextField
                    select
                    label="Filtrar por Categoria"
                    value={filtroCategoria}
                    onChange={handleCategoriaChange}
                    fullWidth
                    style={{ marginRight: 16 }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {categorias.map((categoria) => (
                        <MenuItem key={categoria.id} value={categoria.id}>
                            {categoria.nome}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    select
                    label="Filtrar por Empresa"
                    value={filtroEmpresa}
                    onChange={handleEmpresaChange}
                    fullWidth
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {empresas.map((empresa) => (
                        <MenuItem key={empresa.id} value={empresa.id}>
                            {empresa.nome}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
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
                            <TableCell>Ações</TableCell>
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
                                <TableCell>
                                    <Button onClick={() => navigate(`/cadastro-produto/${produto.id}`)}>Editar</Button>
                                    <Button onClick={() => handleDelete(produto.id)}>Excluir</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ProdutoList;
