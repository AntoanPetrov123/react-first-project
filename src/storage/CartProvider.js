import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD_TO_CART') {
        const updatedItems = state.items.concat(action.item); //give us new array
        const updatedTotalAmount = state.totalAmount + action.item.price;

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
    return defaultCartState;
};
const CartProvider = props => {

    const [cartState, cartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = item => {
        cartAction({type: 'ADD_TO_CART', item: item});
    };
    const removeItemFromCartHandler = id => {
        cartAction({type: 'REMOVE_FROM_CART', id: id});
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount, 
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;