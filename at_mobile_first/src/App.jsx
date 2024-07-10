import './App.css';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';

const Login = lazy(() => import('./pages/Login'));
const RecoverPassword = lazy(() => import('./pages/RecoverPassword'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const CadastroEmpresa = lazy(() => import('./pages/CadastroEmpresa'));
const CadastroCategoria = lazy(() => import('./pages/CadastroCategoria'));
const CadastroProduto = lazy(() => import('./pages/CadastroProduto'));
const ListagemEmpresas = lazy(() => import('./pages/ListagemEmpresas'));
const ListagemCategorias = lazy(() => import('./pages/ListagemCategorias'));
const ListagemProdutos = lazy(() => import('./pages/ListagemProdutos'));

const ProtectedLayout = ({ children }) => (
  <div>
    <Navbar />
    <div>{children}</div>
  </div>
);

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/recuperar-senha" element={<RecoverPassword />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedLayout>
                <Dashboard />
              </ProtectedLayout>
            }
          />
          <Route
            path="/cadastro-empresa"
            element={
              <ProtectedLayout>
                <CadastroEmpresa />
              </ProtectedLayout>
            }
          />
          <Route
            path="/cadastro-categoria"
            element={
              <ProtectedLayout>
                <CadastroCategoria />
              </ProtectedLayout>
            }
          />
          <Route
            path="/cadastro-produto"
            element={
              <ProtectedLayout>
                <CadastroProduto />
              </ProtectedLayout>
            }
          />
          <Route
            path="/listagem-empresas"
            element={
              <ProtectedLayout>
                <ListagemEmpresas />
              </ProtectedLayout>
            }
          />
          <Route
            path="/listagem-categorias"
            element={
              <ProtectedLayout>
                <ListagemCategorias />
              </ProtectedLayout>
            }
          />
          <Route
            path="/listagem-produtos"
            element={
              <ProtectedLayout>
                <ListagemProdutos />
              </ProtectedLayout>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Suspense>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
};

export default App;
