import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const INGREDIENTS_PRICES = {
    meat: 1.3,
    cheese: 0.7,
    bacon: 0.4,
    salad: 0.5
};

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updateState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
    };
    return updateObject(state, updateState);
};

const removeIngredient = (state, action) => {
    const updatedIngredient1 = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
    const updatedIngredients1 = updateObject(state.ingredients, updatedIngredient1);
    const updateState1 = {
        ingredients: updatedIngredients1,
        totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]
    };
    return updateObject(state, updateState1);
};

const setIngredient = (state, action) => {
    return updateObject(state, {
        ingredients: {
            meat: action.ingredients.meat,
            cheese: action.ingredients.cheese,
            bacon: action.ingredients.bacon,
            salad: action.ingredients.salad
        },
        error: false,
        totalPrice: 4
    });
};

const fetchIngreidentsFailed = (state, action) => {
    return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);

        case actionTypes.REMOVE_INGREDINET: return removeIngredient(state, action);

        case actionTypes.SET_INGREDIENTS: return setIngredient(state, action);

        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngreidentsFailed(state, action);

        default:
            return state;
    }
};

export default reducer;