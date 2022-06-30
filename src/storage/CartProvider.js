import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD_TO_CART') {
        const updatedTotalAmount = state.totalAmount + action.item.price;

        const existingItemInCartIndex = state.items.findIndex(item => item.id === action.item.id);

        const existingCartItem = state.items[existingItemInCartIndex];
        let updatedItem;
        let updatedItems;

        if (existingCartItem) {
            updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingItemInCartIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item); //give us new array
        }
 
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