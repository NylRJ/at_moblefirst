import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ProdutoForm = ({ onSubmit }) => {
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
            await addDoc(collection(db, "produtos"), produto);
            onSubmit(produto);
        } catch (e) {
            console.error("Erro ao adicionar produto: ", e);
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
                renderInput={(params) => <TextField {...params} label="Selecione a Categoria" variant="outlined" />}
                fullWidth
            />
            <Autocomplete
                options={empresas}
                getOptionLabel={(option) => option.nome}
                onChange={handleEmpresaChange}
                renderInput={(params) => <TextField {...params} label="Selecione a Empresa" variant="outlined" />}
                fullWidth
            />
            <Button type="submit" variant="contained" color="primary">Salvar</Button>
        </form>
    );
};

export default ProdutoForm;
