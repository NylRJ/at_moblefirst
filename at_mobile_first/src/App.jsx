import './App.css'
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';

const CadastroProduto = lazy(() => import('./pages/CadastroProduto'));
const CadastroEmpresa = lazy(() => import('./pages/CadastroEmpresa'));
const CadastroCategoria = lazy(() => import('./pages/CadastroCategoria'));
const ListagemProdutos = lazy(() => import('./pages/ListagemProdutos'));
const DetalhesEmpresa = lazy(() => import('./pages/DetalhesEmpresa'));

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Suspense fallback={<div>Carregando...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/listagem-produtos" />} />
            <Route path="/cadastro-produto" element={<CadastroProduto />} />
            <Route path="/cadastro-empresa" element={<CadastroEmpresa />} />
            <Route path="/cadastro-categoria" element={<CadastroCategoria />} />
            <Route path="/listagem-produtos" element={<ListagemProdutos />} />
            <Route path="/detalhes-empresa/:id" element={<DetalhesEmpresa />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
