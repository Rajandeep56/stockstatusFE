import React from 'react';
import StockList from '../../components/StockList';
import Header from '../../components/Header';
const Stock = () => {
    return (
        <div>
            <Header/>
            <h1>Stock Page</h1>
            <StockList />
        </div>
    );
};

export default Stock;
