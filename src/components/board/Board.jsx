import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as S from "../../style/LayoutStyle";
import Posts from "./Posts";
import TimePosts from "./TimePosts";
import Pagination from "./Pagination";
import Select from "react-select";

const BoardContainer = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledSelect = styled(Select)`
  width: 150px;
`;

const customStyles = {
  control: (provided) => ({
    ...provided,
    outline: "none",
    backgroundColor: "black",
    borderColor: "white",
    borderRadius: "10px",
    boxShadow: "none",
    "&:hover": {
      borderColor: "white",
    },
  }),

  option: (provided, state) => ({
    ...provided,
    outline: "none",
    fontWeight: state.isSelected ? "bold" : "normal",
    color: "black",
    backgroundColor: "white",
    fontSize: state.selectProps.myFontSize,
    "&:hover": {
      backgroundColor: "#d2d2d2",
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "white",
    backgroundColor: "black",
  }),
};

const AddButton = styled.button`
  border: none;
  margin-right: 20px;
  border-radius: 5px;
  background: #8fe088;
  width: 351px;
  height: 56px;
  flex-shrink: 0;
  color: #000;
  text-align: center;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -1.414px;
`;

const DeleteButton = styled.button`
  border: none;
  margin-right: 20px;
  border-radius: 5px;
  background: #e08888;
  width: 102px;
  height: 56px;
  flex-shrink: 0;
  color: #000;
  text-align: center;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -1.414px;
`;

const Board = ({ pass, type, onAdd, onDelete }) => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const [selectTrack, setSelectTrack] = useState({
    value: "all",
    label: "전체트랙",
  });

  const offset = (page - 1) * limit;

  const postsData = (posts) => {
    let filteredPosts = [];
    if (posts && posts.length > 0) {
      switch (selectTrack.value) {
        case "all":
          filteredPosts = posts[0];
          break;
        case "pm":
          filteredPosts = posts[1];
          break;
        case "fe":
          filteredPosts = posts[2];
          break;
        case "be":
          filteredPosts = posts[3];
          break;
        default:
          filteredPosts = [];
      }
    }
    let result = filteredPosts.slice(offset, offset + limit);

    return { filteredPosts: result, filteredPostsLength: filteredPosts.length };
  };

  const { filteredPosts, filteredPostsLength } = postsData(pass);
  const handleSelectTrackChange = (e) => {
    if (e) {
      setSelectTrack(e);
      setPage(1);
    } else {
      setSelectTrack("");
    }
  };

  const tracks = [
    { value: "all", label: "전체트랙" },
    { value: "pm", label: "기획 · 디자인" },
    { value: "fe", label: "프론트엔드" },
    { value: "be", label: "백엔드" },
  ];

  const [checkedItems, setCheckedItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showPopup]);

  const handleDeleteButtonClick = () => {
    if (checkedItems.length === 0) {
      alert("선택된 지원자가 없습니다.");
    } else {
      if (
        window.confirm("선택한 지원자를 합격자 테이블에서 삭제하시겠습니까?")
      ) {
        onDelete(checkedItems);
        setCheckedItems([]);
        alert("선택한 지원자가 합격자 테이블에서 삭제되었습니다.");
      }
    }
  };

  const handleFirstAddButtonClick = () => {
    if (checkedItems.length === 0) {
      alert("선택된 지원자가 없습니다.");
    } else {
      if (
        window.confirm("선택한 지원자를 서류 합격자 테이블에 추가하시겠습니까?")
      ) {
        onAdd(checkedItems);
        setCheckedItems([]);
        alert(
          "선택한 지원자가 서류 합격자 테이블에 추가되었습니다. \n합격자 테이블은 [신규모집관리 - 서류 합격자 선정] 탭에서 확인 가능합니다. "
        );
      }
    }
  };

  const handleAddButtonClick = () => {
    if (checkedItems.length === 0) {
      alert("선택된 지원자가 없습니다.");
    } else {
      if (
        window.confirm("선택한 지원자를 최종합격자 테이블에 추가하시겠습니까?")
      ) {
        onAdd(checkedItems);
        setCheckedItems([]);
        alert(
          "선택한 지원자가 최종 합격자 테이블에 추가되었습니다. \n합격자 테이블은 [신규모집관리 - 최종 합격자 선정] 탭에서 확인 가능합니다. "
        );
      }
    }
  };

  return (
    <BoardContainer>
      <Wrapper>
        <S.SubTitle>지원 서류</S.SubTitle>
        <StyledSelect
          options={tracks}
          onChange={handleSelectTrackChange}
          defaultValue={tracks[0]}
          styles={customStyles}
          isSearchable={false}
        ></StyledSelect>
      </Wrapper>
      {type === "type3" && (
        <TimePosts
          list={filteredPosts}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
        />
      )}
      {(type === "type1" || type === "type2") && (
        <Posts
          list={filteredPosts}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
        />
      )}
      {!showPopup && (
        <Pagination
          limit={limit}
          page={page}
          totalPosts={filteredPostsLength}
          setPage={setPage}
        />
      )}
      {type === "type1" && (
        <S.ButtonContainer>
          <S.ButtonSet>
            <AddButton onClick={handleFirstAddButtonClick}>
              합격자 테이블에 추가 +
            </AddButton>
          </S.ButtonSet>
        </S.ButtonContainer>
      )}
      {type === "type2" && (
        <S.ButtonContainer>
          <S.ButtonSet>
            <DeleteButton onClick={handleDeleteButtonClick}>삭제</DeleteButton>
          </S.ButtonSet>
        </S.ButtonContainer>
      )}
      {type === "type3" && !showPopup && (
        <S.ButtonContainer>
          <S.ButtonSet>
            <AddButton onClick={handleAddButtonClick}>
              최종합격자 테이블에 추가 +
            </AddButton>
            <DeleteButton onClick={handleDeleteButtonClick}>삭제</DeleteButton>
          </S.ButtonSet>
        </S.ButtonContainer>
      )}
    </BoardContainer>
  );
};

export default Board;
