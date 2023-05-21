import React, { useEffect } from 'react';
import axios from 'axios';

// import context
import { useProductContext } from '@/context/ProductContext';

// import components
import AddProducts from '@/components/AddProducts';
import ProductTable from '@/components/ProductTable';

export default function Home({ productsData, prodCatData }) {

  // import context
  const { setProducts, setProdCategory } = useProductContext();

  useEffect(() => {
    setProducts(productsData);
    setProdCategory(prodCatData);
  }, [productsData, prodCatData])

  return (
    <section>
      <div className="w-full">
        <AddProducts />
        <ProductTable />
      </div>
    </section>
  )
}

// get all products and category data with SSR
export async function getServerSideProps() {
  try {
    // products data
    const resProd = await axios.get(process.env.BASE_URL + '/products',{
      headers: {
        apiKey: process.env.API_KEY
      }
    });
    const productsData = await resProd.data;

    // category data
    const resCat = await axios.get(process.env.BASE_URL + '/products/category-name-wise-product-names');
    const prodCatData = await resCat.data;

    return {
      props: {
        productsData,
        prodCatData
      }
    }
  } catch (err) {
    console.log(err);

    return {
      props: {
        data: null
      }
    }
  }
}