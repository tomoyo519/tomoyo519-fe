import styled from 'styled-components';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import usePagination from '../hook/usePagination';

interface Props {
  totalCount: number;
  currentPage: number;
  onChangePage: (page: number) => void;
  itemCountPerPage?: number;
  pageCountPerSection?: number;
}

const Pagination = ({ totalCount, currentPage, onChangePage }: Props) => {
  const {
    pages,
    selectedPage,
    handeClickPage,
    goToNextPageSection,
    goToPrevPageSection,
    prevPageSectionDisabled,
    nextPageSectionDisabled,
  } = usePagination({ totalCount, currentPage, onChangePage });

  return (
    <Container>
      <Button disabled={prevPageSectionDisabled} onClick={goToPrevPageSection}>
        <VscChevronLeft />
      </Button>
      <PageWrapper>
        {pages.map((page) => (
          <Page
            key={page}
            selected={page === selectedPage}
            disabled={page === selectedPage}
            onClick={handeClickPage(page)}
          >
            {page}
          </Page>
        ))}
      </PageWrapper>
      <Button disabled={nextPageSectionDisabled} onClick={goToNextPageSection}>
        <VscChevronRight />
      </Button>
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-top: 40px;
  margin-left: -20px;
`;

const Button = styled.button`
  cursor: pointer;
  &:disabled {
    color: #e2e2ea;
    cursor: default;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  margin: 0 16px;
`;

type PageType = {
  selected: boolean;
};

const Page = styled.button<PageType>`
  padding: 4px 6px;
  background-color: ${({ selected }) => (selected ? '#000' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  font-size: 20px;
  & + & {
    margin-left: 4px;
  }
  cursor: pointer;
  &:disabled {
    cursor: default;
  }
`;
