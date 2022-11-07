import axios from 'axios';
import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const ProductDetailPage: NextPage = () => {
  const [productInfo, setProductInfo] = useState<any>([]);
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();
  const id = Array.isArray(router?.query?.id)
    ? router?.query?.id.join('')
    : router?.query?.id || '';

  useEffect(() => {
    getProductInfo();
  }, [id]);

  const getProductInfo = async () => {
    const res = await axios
      .get(`/products/${id}`)
      .then((res) => {
        setProductInfo(res.data.data);
      })
      .catch((err) => {
        setError(true);
      });
  };

  return (
    <>
      {error ? (
        <ErrorMsg>존재하지 않는 상품입니다.</ErrorMsg>
      ) : (
        <>
          <Thumbnail
            src={
              productInfo?.product?.thumbnail
                ? productInfo?.product?.thumbnail
                : '/defaultThumbnail.jpg'
            }
          />
          <ProductInfoWrapper>
            <Name>{productInfo?.product?.name}</Name>
            <Price>{productInfo?.product?.price?.toLocaleString('ko-KR')}원</Price>
          </ProductInfoWrapper>
        </>
      )}
    </>
  );
};

export default ProductDetailPage;

const Thumbnail = styled.img`
  width: 100%;
  height: 420px;
`;

const ProductInfoWrapper = styled.div`
  margin-top: 20px;
  padding: 0 20px;
`;

const Name = styled.h3`
  font-size: 20px;
  font-weight: bold;
`;

const Price = styled.span`
  font-size: 18px;
  margin-top: 8px;
`;

const ErrorMsg = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
