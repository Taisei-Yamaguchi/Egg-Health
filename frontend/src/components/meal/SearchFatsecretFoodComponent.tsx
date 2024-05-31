"use client"
import React, { useState } from 'react';
import { searchFatsecretFoods } from '@/backend_api/meal/searchFatsecretFoods';
import { FatSecretFood } from '@/interfaces/meal.interface';
import { setToast } from '@/store/slices/toast.slice';
import { resetToast } from '@/store/slices/toast.slice';
import { useAppDispatch } from '@/store';
import { setUsedFatSecretFood } from '@/store/slices/meal.slice';
import { resetUsedFood } from '@/store/slices/meal.slice';

const SearchFatsecretFoodComponent: React.FC = () => {
  const dispatch = useAppDispatch()
  const [searchKey, setSearchKey] = useState('');
  const [searchResults, setSearchResults] = useState<FatSecretFood[]>([]);

  const handleSearch = async (searchKey: string) => {
    try {
        const response = await searchFatsecretFoods(searchKey);
        if ('error' in response) {
            dispatch(setToast({ message: response.error, type: 'error' }));
            setTimeout(() => dispatch(resetToast()), 3000);
            return;
        }
        if ('message' in response) {
            setSearchResults(response.data);
            console.log(response)
        }
    } catch (error) {
        console.error('Error fetching custom foods:', error);
    }
};

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch(searchKey);
  };

  const selectFood = (selectedFood: FatSecretFood) => {
    dispatch(setUsedFatSecretFood(selectedFood)); // Dispatch the selected food
    dispatch(resetUsedFood());
};

  return (
    <div className='border w-full'>
      <h1>Food Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchKey}
          onChange={handleChange}
          placeholder="Search for food..."
        />
        <button type="submit">Search</button>
      </form>
      <div>
        <h2>Search Results</h2>
        <ul>
          {searchResults.map((result) => (
            <li key={result.food_id} className='text-sm w-full border'>
              <button onClick={() => selectFood(result)} className='w-full border'>
                {result.name}  {result.brand_name?(<div>{result.brand_name}</div>):(<div>{result.type}</div>)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchFatsecretFoodComponent;
