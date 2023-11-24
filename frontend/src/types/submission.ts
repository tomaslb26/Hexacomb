export interface ItemSale {
    price: string;
    item: string;
}

export type Submission = {
    id?: string;
    userId?: number;
    title: string;
    description: string;
    items: ItemSale[];
    x?: number;
    y?: number;
    z?: number;
    images: string[];
    mcName: string;
    type: 'SHOP' | 'POI';
    status?: 'ON_HOLD' | 'ACCEPTED' | 'REJECTED';
}

export type SubmissionActions = 
    | { type: 'SET_TITLE', payload: string }
    | { type: 'SET_DESCRIPTION', payload: string }
    | { type: 'SET_X', payload: number }
    | { type: 'SET_Y', payload: number }
    | { type: 'SET_Z', payload: number }
    | { type: 'SET_IMAGES', payload: string[] }
    | { type: 'SET_MCNAME', payload: string }
    | { type: 'SET_TYPE', payload: 'SHOP' | 'POI' }
    | { type: 'SET_ITEMS', payload: ItemSale[] }
    | { type: 'ADD_ITEM', payload: ItemSale }
    | { type: 'REMOVE_ITEM', payload: number }
    | { type: 'RESET'}


export const SubmissionReducer = (state: Submission, action: SubmissionActions): Submission => {
    switch(action.type){
        case 'SET_TITLE':
            return {...state, title: action.payload};
        case 'SET_DESCRIPTION':
            return {...state, description: action.payload};
        case 'SET_X':
            return {...state, x: action.payload};
        case 'SET_Y':
            return {...state, y: action.payload};
        case 'SET_Z':
            return {...state, z: action.payload};
        case 'SET_IMAGES':
            if(state.images.length >= 3) return state;
            return {...state, images: action.payload};
        case 'SET_MCNAME':
            return {...state, mcName: action.payload};
        case 'SET_TYPE':
            return {...state, type: action.payload};
        case 'SET_ITEMS':
            return {...state, items: action.payload};
        case 'ADD_ITEM':
            return {...state, items: state.items ? [...state.items, action.payload] : [action.payload]};
        case 'REMOVE_ITEM':
            return {...state, items: state.items?.filter((_, i) => i !== action.payload)};
        case 'RESET':
            return {
                title: "",
                description: "",
                items: [],
                images: [],
                mcName: "",
                type: "SHOP"
            }
        default:
            return state;
    }
}