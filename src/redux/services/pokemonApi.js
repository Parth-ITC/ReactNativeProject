import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
    prepareHeaders: (headers, {getState}) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
    //   const token = getState()?.auth?.token;
    //   console.log(token,'TOKEN');
    //   if (token) {
    //     headers.set('authorization', `Bearer ${token}`);
    //   }
      return headers;
    },
  }),
  endpoints: builder => ({
    getPokemonByName: builder.query({
      query: name => `pokemon/${name}`,
    }),
    getTodoList: builder.query({
        query: () => 'todos'
    })
  }),
});
export const {useGetPokemonByNameQuery,useGetTodoListQuery} = pokemonApi;
