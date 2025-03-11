import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppWrapper from "./common/routes.tsx";
import {CartProvider} from "./components/cart/cartProvider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <CartProvider>
            <AppWrapper />
        </CartProvider>
    </React.StrictMode>
);
