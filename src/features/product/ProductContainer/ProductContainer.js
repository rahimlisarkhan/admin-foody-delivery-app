import React from 'react';
import { useEffect } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../../store/slices/product/productSlice'
import { getProductDataUrl } from '../../../services/product';
import Pagenations from "../../../components/Pagination/index";
import { useState } from 'react'

export const ProductContainer = () => {
    const ProductSelector = useSelector((state) => state.products.products)
    const dispatch = useDispatch();

    const getFillProduct = async () => {
        const res = await getProductDataUrl()
        dispatch(getData(res))
    }

    useEffect(() => {
        getFillProduct()
    }, [])

    const [page, setPage] = useState(1);
    const postsPerPage = Math.ceil(ProductSelector.length / 10);
    const indexOfLastPost = page * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = ProductSelector.slice(indexOfFirstPost, indexOfLastPost)
    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <>
            <ProductCard ProductSelector={currentPosts} />
            <Pagenations postsPerPage={postsPerPage} page={page} handleChange={handleChange}/>
        </>
    );
};

