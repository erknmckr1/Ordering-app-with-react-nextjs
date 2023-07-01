import MenuWrapper from '@/components/product/MenuWrapper'
import axios from 'axios'
import React from 'react'

function index({categoryList,productList}) {
  return (
    <div>
        <MenuWrapper categoryList={categoryList} productList={productList}/>
    </div>
  )
}

export default index

export const getServerSideProps = async () => {
  const categories = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category`);
  const products = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product`);
  return{
    props:{
      categoryList : categories.data ? categories.data :[],
      productList : products.data ? products.data : []
    }
  }
}