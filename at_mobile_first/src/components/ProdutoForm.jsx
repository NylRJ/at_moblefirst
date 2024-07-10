import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, updateDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from 'react-router-dom';

const ProdutoForm = ({ onSubmit }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [produto, setProduto] = useState({
        nome: '',
        descricao: '',
        valor: '',
        imagem: '',
        categoria: null,
        empresas: []
    });
    const [empresas, setEmpresas] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [selectedEmpresa, setSelectedEmpresa] = useState(null);
    const [selectedCategoria, setSelectedCategoria] = useState(null);

    useEffect(() => {
        const fetchEmpresas = async () => {
            const empresasSnapshot = await getDocs(collection(db, "empresas"));
            const empresasList = empresasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setEmpresas(empresasList);
        };

        const fetchCategorias = async () => {
            const categoriasSnapshot = await getDocs(collection(db, "categorias"));
            const categoriasList = categoriasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCategorias(categoriasList);
        };

        fetchEmpresas();
        fetchCategorias();
    }, []);

    useEffect(() => {
        if (id) {
            const fetchProduto = async () => {
                const produtoDoc = await getDoc(doc(db, 'produtos', id));
                if (produtoDoc.exists()) {
                    const produtoData = produtoDoc.data();
                    setProduto(produtoData);
                    setSelectedEmpresa(produtoData.empresas[0]);
                    setSelectedCategoria(produtoData.categoria);
                }
            };
            fetchProduto();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduto((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEmpresaChange = (event, newValue) => {
        setSelectedEmpresa(newValue);
        setProduto((prev) => ({
            ...prev,
            empresas: newValue ? [{ id: newValue.id, nome: newValue.nome }] : []
        }));
    };

    const handleCategoriaChange = (event, newValue) => {
        setSelectedCategoria(newValue);
        setProduto((prev) => ({
            ...prev,
            categoria: newValue ? { id: newValue.id, nome: newValue.nome } : null
        }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const storage = getStorage();
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setProduto((prev) => ({
            ...prev,
            imagem: url
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!selectedCategoria || !selectedCategoria.id) {
                toast.error('Por favor, selecione uma categoria válida.');
                return;
            }

            const updatedProduto = {
                ...produto,
                categoria: {
                    id: selectedCategoria.id,
                    nome: selectedCategoria.nome
                }
            };

            if (id) {
                await updateDoc(doc(db, "produtos", id), updatedProduto);
                toast.success('Produto atualizado com sucesso!');
            } else {
                await addDoc(collection(db, "produtos"), updatedProduto);
                toast.success('Produto salvo com sucesso!');
            }
            onSubmit(updatedProduto);
            navigate('/listagem-produtos'); // Redireciona para a página de listagem de produtos
        } catch (e) {
            toast.error('Erro ao salvar produto!');
            console.error("Erro ao adicionar/atualizar produto: ", e);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField name="nome" label="Nome" value={produto.nome} onChange={handleChange} fullWidth />
            <TextField name="descricao" label="Descrição" value={produto.descricao} onChange={handleChange} fullWidth />
            <TextField name="valor" label="Valor" value={produto.valor} onChange={handleChange} fullWidth />
            <input type="file" onChange={handleImageUpload} />
            <Autocomplete
                options={categorias}
                getOptionLabel={(option) => option.nome}
                onChange={handleCategoriaChange}
                value={selectedCategoria}
                renderInput={(params) => <TextField {...params} label="Selecione a Categoria" variant="outlined" />}
                fullWidth
            />
            <Autocomplete
                options={empresas}
                getOptionLabel={(option) => option.nome}
                onChange={handleEmpresaChange}
                value={selectedEmpresa}
                renderInput={(params) => <TextField {...params} label="Selecione a Empresa" variant="outlined" />}
                fullWidth
            />
            <Button type="submit" variant="contained" color="primary">Salvar</Button>
        </form>
    );
};

export default ProdutoForm;
