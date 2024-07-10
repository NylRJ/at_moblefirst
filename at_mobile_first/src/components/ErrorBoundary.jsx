import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Atualiza o estado para que a próxima renderização mostre a UI alternativa
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Você pode registrar o erro em um serviço de relatórios de erros
        console.error("Error caught in ErrorBoundary: ", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Você pode renderizar qualquer UI alternativa
            return <h1>Algo deu errado.</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
