import { configureStore } from '@reduxjs/toolkit';
import { createSlice} from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web



const initialStateItems = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];


const initialState = {
    items: initialStateItems,
    filter: '',
};

const persistConfig = {
    key: 'contacts',
    storage,
    whitelist: ['items']
  }
  
  
  export const contactsSlice = createSlice({
      name: 'contacts',
      initialState: initialState,
      reducers: {
          add(state, action) {
              state.items.push(action.payload);
            },
            remove(state, action) {
                state.items = state.items.filter(contact => contact.id !== action.payload);
            },
            filter(state, action) {
                state.filter = action.payload;
            },
        },
    });
    
    const persistedContacts = persistReducer(persistConfig, contactsSlice.reducer )
    
export const store = configureStore({
    reducer: {
        contacts: persistedContacts,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
    export const persistor = persistStore(store)
    
    
    export const {add, remove, filter} = contactsSlice.actions
  
   