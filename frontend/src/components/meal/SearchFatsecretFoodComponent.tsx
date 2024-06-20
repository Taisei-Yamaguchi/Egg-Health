"use client"
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { searchFatsecretFoods } from '@/backend_api/meal/searchFatsecretFoods';
import { FatSecretFood } from '@/interfaces/meal.interface';
import { setToast, resetToast } from '@/store/slices/toast.slice';
import { useAppDispatch } from '@/store';
import { setSelectFoodList, resetMealSetList } from '@/store/slices/meal.slice';

// Validation schema
const formSchema = yup.object().shape({
  searchKey: yup
    .string()
    .trim()
    .required("Search key is required!"),
});

const SearchFatsecretFoodComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      searchKey: '',
    },
    validationSchema: formSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await searchFatsecretFoods(values.searchKey);
        if ('error' in response) {
          dispatch(setToast({ message: response.error, type: 'error' }));
          setTimeout(() => dispatch(resetToast()), 3000);
          return;
        }
        if ('message' in response) {
          dispatch(resetMealSetList());
          dispatch(setSelectFoodList(response.data));
        }
      } catch (error) {
        console.error('Error fetching custom foods:', error);
      } finally {
        resetForm();
      }
    },
  });

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="flex items-center bg-green-300 p-1 rounded w-80">
      <form onSubmit={formik.handleSubmit} className="flex items-center">
        <input
          type="text"
          id="searchKey"
          name="searchKey"
          value={formik.values.searchKey}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Search Food"
          className="px-2 py-1 text-gray-700 bg-white border rounded-l-md text-xs w-48 focus:outline-none"
        />
        <button
          type="submit"
          className="flex items-center justify-center px-2 py-1 text-white bg-slate-100 border border-l-0 rounded-r-md hover:bg-gray-200 text-xs"
        >
          <span className="flex items-center">
            <svg
              className="w-3 h-3 mr-1 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG content */}
            </svg>
            <span className='text-slate-500 '>Search</span>
          </span>
        </button>
      </form>
      <div className="ml-2 relative">
        <button onClick={openModal} className="text-gray-700 text-xs hover:border-b border-color-black">How ?</button>

        {modalIsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg max-w-lg mx-4 my-8 relative">
              <button onClick={closeModal} className="absolute top-4 right-4 bg-gray-300 text-gray-700 p-1 rounded-full text-xs">✕</button>
              <h2 className="text-lg font-bold mb-4">How to Search</h2>
              <ul className="list-disc list-inside">
                <li>Search is limited to 50 times per day.</li>
                <li>Search using alphabets.</li>
                <li>Examples: search using product names, food names, types such as "McDonald" or "mushroom".</li>
                <li>Future updates will remove the daily search limit and allow searches in Japanese.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFatsecretFoodComponent;
