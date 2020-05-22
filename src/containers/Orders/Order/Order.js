import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }
    const ingredientsOutput = ingredients.map(ig => {
        return <span
                    key={ig.name}
                    style={{
                        display: 'inline-block',
                        border: '1px solid #ccc',
                        margin: '0 8px',
                        padding: '5px',
                        textTransform: 'capitalize'
                    }}>{ig.name} ({ig.amount})</span>
    });
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>{props.price.toFixed(2)}</strong></p>
        </div>
    );
};

export default order;