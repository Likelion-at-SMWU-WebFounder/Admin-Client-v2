import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  position: relative;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  top: 4px;
  width: 20px;
  height: 20px;
  border: 1.5px solid gainsboro;
  border-radius: 5px;
  background-color: white;
  transition: background-color 0.3s, border-color 0.3s;

  &:checked {
    border-color: transparent;
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #eb9537;

    &::before {
      content: "✔";
      font-size: 14px;
      color: black;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const Table = styled.div`
  display: table;
  width: 100%;
  border-collapse: collapse;
`;

const ContentWrap = styled.div`
  display: table-row-group;
`;

const ContentTitle = styled.div`
  background-color: rgba(217, 217, 217, 0.3);
  border-top: 1px solid white;
  border-bottom: 1px solid white;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -1.263px;
  display: table-row;
`;

const TableCell = styled.div`
  display: table-cell;
  padding: 8px;
  white-space: nowrap;
`;

const Cell = styled.div`
  display: table-cell;
  padding: 8px;
  white-space: nowrap;
`;

const Button = styled.button`
  display: table-cell;
  border-radius: 15px;
  border: none;
  background: #d9d9d9;
  width: 139px;
  height: 31px;
  flex-shrink: 0;
  color: #111;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -1.01px;
`;

const Content = styled.div`
  display: table-row;
  align-items: center;
  border-bottom: 1px solid white;
  font-size: 25px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -1.263px;
`;

const ImageWrap = styled.div``;

const Posts = ({ list, checkedItems, setCheckedItems }) => {
  const [isAllChecked, setIsAllChecked] = useState(false);

  useEffect(() => {
    setIsAllChecked(list.length > 0 && checkedItems.length === list.length);
  }, [checkedItems, list]);

  const onCheckBoxAll = (e) => {
    if (!isAllChecked) {
      const allItems = list.map((item) => item.joinerId);
      setCheckedItems(allItems);
    } else {
      setCheckedItems([]);
    }
  };

  const onChangeCheckBox = (e, item) => {
    const isChecked = e.target.checked;
    setCheckedItems((prevCheckedItems) => {
      if (isChecked) {
        return [...prevCheckedItems, item.joinerId];
      } else {
        return prevCheckedItems.filter((no) => no !== item.joinerId);
      }
    });
  };

  const openDetailDocument = (joinerId) => {
    window.open(`/sooklion-admin/apply/${joinerId}`, "_blank");
  };

  return (
    <Table>
      <ContentWrap>
        <ContentTitle>
          <TableCell>
            <StyledInput
              type="checkbox"
              onChange={onCheckBoxAll}
              checked={isAllChecked}
            />
          </TableCell>
          <TableCell>번호</TableCell>
          <TableCell>이름</TableCell>
          <TableCell>전화번호</TableCell>
          <TableCell>학번</TableCell>
          <TableCell>지원트랙</TableCell>
          <TableCell>서류 제출 시간</TableCell>
          <TableCell></TableCell>
        </ContentTitle>
        {list !== undefined ? (
          list.map((data, idx) => (
            <Content key={idx}>
              <Cell>
                <StyledInput
                  type="checkbox"
                  onChange={(e) => onChangeCheckBox(e, data)}
                  checked={checkedItems.includes(data.joinerId)}
                />
              </Cell>
              <Cell>{data.joinerId}</Cell>
              <Cell>{data.name}</Cell>
              <Cell>{data.phoneNum}</Cell>
              <Cell>{data.studentID}</Cell>
              <Cell>{data.track}</Cell>
              <Cell>{data.submissionTime}</Cell>
              <Button onClick={() => openDetailDocument(data.joinerId)}>
                서류 확인
              </Button>
            </Content>
          ))
        ) : (
          <ImageWrap>
            <img src={`${process.env.PUBLIC_URL}/Logo.svg`} alt="loadingImg" />
          </ImageWrap>
        )}
      </ContentWrap>
    </Table>
  );
};

export default Posts;
