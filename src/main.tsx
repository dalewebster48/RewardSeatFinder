import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import App from './components/App/App.js';
import './styles.css';

const getApolloUri = () => {
    // Check if we're in production (GitHub Pages)
    // Use multiple checks to ensure we detect production correctly
    const isProduction = import.meta.env.PROD || 
                        import.meta.env.MODE === 'production' ||
                        window.location.hostname !== 'localhost';

    if (isProduction) {
        // Production - your DigitalOcean server
        return 'http://178.62.13.89/graphql';
    } else {
        // Development - local server
        return 'http://localhost:4000/graphql';
    }
};

const client = new ApolloClient({
    uri: getApolloUri(),
    cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>
);