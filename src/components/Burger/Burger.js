import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {
    let tranfomedIngredients = Object.keys(props.ingredients).map(
        igKey => {
            return [...Array(props.ingredients[igKey])].map(
                (_, i) => {
                    return <BurgerIngredients key={igKey + i} type={igKey} />
                }
            );
        }
    ).reduce((arr, el) => {
        return arr.concat(el);
    }, []);
    if (tranfomedIngredients.length === 0) {
        tranfomedIngredients = <p>Please start adding ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top"/>
            {tranfomedIngredients}
            <BurgerIngredients type="bread-bottom"/>
        </div>
    );
}

export default burger;