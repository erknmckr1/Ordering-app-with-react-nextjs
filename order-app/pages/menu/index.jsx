import MenuWrapper from '@/components/product/MenuWrapper'
import axios from 'axios'
import React from 'react'

function index({categoryList}) {
  return (
    <div>
        <MenuWrapper categoryList={categoryList}/>
    </div>
  )
}

export default index

export const getServerSideProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category`);

  return{
    props:{
      categoryList : res.data ? res.data :[],
    }
  }
}