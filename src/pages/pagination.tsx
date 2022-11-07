import react, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { NextPage, GetServerSideProps } from 'next';
import styled from 'styled-components';
import axios, { AxiosError } from 'axios';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';

const PaginationPage: NextPage = () => {
  const router = useRouter();
  const [productsData, setProductsData] = useState<any>([]);
  const page = !router.query.page || Array.isArray(router.query.page) ? '1' : router.query.page;
  const [error, setError] = useState<boolean>(false);
  const getProducts = async (page: number | string, size: number = 10) => {
    const res = await axios
      .get(`/products?page=${page}&size=${size}`)
      .then((res) => {
        setProductsData(res.data.data);
      })
      .catch((err) => {
        setError(true);
      });
  };
  // const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    getProducts(page);
  }, [page]);
  const handleChangePage = (page: number) => {
    console.log('thisisproductsData at func', productsData);
    router.push(`/pagination?page=${page}`);
  };

  return (
    <Container>
      {error ? (
        <ErrorMsg>존재하지 않는 페이지 입니다.</ErrorMsg>
      ) : (
        <>
          <ProductList products={productsData?.products || []} />
          <Pagination
            totalCount={productsData?.totalCount}
            currentPage={+page}
            onChangePage={handleChangePage}
          />
        </>
      )}
    </Container>
  );
};

export default PaginationPage;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px 40px;
`;

const ErrorMsg = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
