import React, { createContext, useContext, useReducer } from 'react';

const CardStateContext = createContext();
const CardDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state , { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }];
        case "REMOVE":
            return state.filter((_, index) => index !== action.index);
        case "UPDATE":
            return state.map((food) =>
                food.id === action.id && food.size === action.size
                    ? { ...food, qty: food.qty + action.qty, price: action.price }
                    : food
            );
            case "DROP":
                let emtArray=[]
                return emtArray
        default:
            throw new Error("Invalid action type");
    }
};

export const CardProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);
    return (
        <CardDispatchContext.Provider value={dispatch}>
            <CardStateContext.Provider value={state}>
                {children}
            </CardStateContext.Provider>
        </CardDispatchContext.Provider>
    );
};
export const useCard = () => useContext(CardStateContext);
export const useDispatchCard = () => useContext(CardDispatchContext);
