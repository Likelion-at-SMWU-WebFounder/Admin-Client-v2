import React, { useState } from "react";
import styled from "styled-components";

const ButtonWrap = styled.div`
  margin: 60px auto;
`;
const Button = styled.button`
  color: white;
  margin: 5px;
  padding: 8px;
  border: none;
  background: none;
  cursor: pointer;
  opacity: 0.8;
  font-size: 25px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -1.263px;

  &.activeButton {
    border: none;
    color: #fff;
    font-weight: 900;
    opacity: 1;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const Pagination = ({ totalPosts, limit, page, setPage }) => {
  const numPages = Math.ceil(totalPosts / limit);
  const [currPage, setCurrPage] = useState(page);
  let firstNum = currPage - (currPage % 5) + 1;

  return (
    <ButtonWrap>
      <Button
        onClick={() => {
          const newPage = Math.max(1, page - 5);
          setPage(newPage);
          setCurrPage(newPage);
        }}
        disabled={page === 1}
      >
        &lt;
      </Button>
      <Button
        onClick={() => setPage(firstNum)}
        aria-current={page === firstNum ? "page" : null}
        className={page === firstNum ? "activeButton" : ""}
      >
        {firstNum}
      </Button>
      {Array(4)
        .fill()
        .map((_, i) => {
          const pageNum = firstNum + i + 1;
          if (pageNum <= numPages) {
            return (
              <Button
                key={pageNum}
                onClick={() => {
                  setPage(pageNum);
                }}
                className={page === pageNum ? "activeButton" : ""}
                aria-current={page === pageNum ? "page" : null}
              >
                {pageNum}
              </Button>
            );
          } else {
            return null; // 페이지 수를 넘어가는 경우 null을 반환하여 렌더링하지 않음
          }
        })}
      <Button
        onClick={() => {
          const newPage = Math.min(numPages, page + 5);
          setPage(newPage);
          setCurrPage(newPage);
        }}
        disabled={page === numPages}
      >
        &gt;
      </Button>
    </ButtonWrap>
  );
};

export default Pagination;
