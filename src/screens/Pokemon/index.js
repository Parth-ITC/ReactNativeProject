import {View, Text} from 'react-native';
import React from 'react';
import {
  useGetPokemonByNameQuery,
  useGetTodoListQuery,
} from '../../redux/services/pokemonApi';

const PokemonScreen = () => {
  //   const {data, error, isLoading} = useGetPokemonByNameQuery('bulbasaur');
  const {data,isLoading} = useGetTodoListQuery();

  return (
    <View>
      <Text>index</Text>
    </View>
  );
};

export default PokemonScreen;
