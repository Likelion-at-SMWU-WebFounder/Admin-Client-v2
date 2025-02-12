import React, { useState, useEffect } from "react";
import styled from "styled-components";
import apiModule from "../../api/apiModule";
import splitDatetime from "../../utils/splitDatetime";

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  position: relative;
  color: black;
  background-color: white;
  border-radius: 10px;
  width: 1000px;
  height: 750px;
  padding: 50px;
`;

const HopeTimeContainer = styled.div`
  position: absolute;
  top: 127px;
  font-size: 30px;
  margin-top: 0px;
`;

// const UlDiv = styled.ul`
//   overflow-y: auto;
//   max-height: 200px;
//   &::-webkit-scrollbar {
//     width: 8px;
//     height: 8px;
//     border-radius: 6px;
//     background: rgba(255, 255, 255, 0.4);
//   }
//   &::-webkit-scrollbar-thumb {
//     background-color: rgba(0, 0, 0, 0.3);
//     border-radius: 6px;
//   }
// `;

// const Ul = styled.ul`
//   margin-left: 30px;
//   max-height: 50%;
// `;

// const TimeDiv = styled.li`
//   font-size: 25px;
//   list-style-type: disc;
// `;

const Bold = styled.span`
  font-weight: bolder;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 30px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 200px;
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  position: absolute;
  right: 16px;
  top: 30px;
  font-size: 55px;
  border-radius: 5px;
  border: none;
  background: none;
  color: black;
  cursor: pointer;
`;

const SaveButton = styled.button`
  position: absolute;
  bottom: 27px;
  right: 16px;
  border: none;
  margin-right: 20px;
  border-radius: 5px;
  background: #9fb9fd;
  width: 80px;
  height: 44px;
  flex-shrink: 0;
  color: #000;
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  line-height: 38px;
  letter-spacing: -0.0505em;
  text-align: center;

  box-sizing: content-box;
`;

const TimePopup = ({ track, aname, joinerId, onClose }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedInterview, setSelectedInterview] = useState();

  const handleSave = async () => {
    try {
      await apiModule.saveInterviewTime({
        interviewDate: selectedDate,
        interviewTime: selectedTime,
        joinerId: joinerId,
      });
      onClose();
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchInterviewTime = async () => {
      try {
        if (joinerId) {
          const data = await apiModule.fetchInterviewTime(joinerId);
          setSelectedInterview(splitDatetime(data));
          console.log(selectedInterview);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchInterviewTime();
  }, [joinerId, selectedInterview]);

  return (
    <PopupOverlay>
      <PopupContent>
        <CancelButton onClick={onClose}>x</CancelButton>
        <HopeTimeContainer>
          <div>
            <Bold>{track}</Bold> 트랙 서류합격자 <Bold>{aname}</Bold>님의
          </div>
          {/* <UlDiv>
            {Object.keys(selectedInterview).map((key, idx) => (
              <Ul key={idx}>
                <TimeDiv> {selectedInterview[key]}</TimeDiv>
              </Ul>
            ))}
          </UlDiv> */}
          <h2 style={{ fontSize: "30px", margin: "30px auto" }}>
            면접 확정 시간을 입력해주세요
          </h2>
          <Select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            <option value="">날짜 선택</option>
            {selectedInterview &&
              Object.keys(selectedInterview).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
          </Select>
          <Select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          >
            <option value="">시간 선택</option>
            {selectedInterview &&
              selectedDate &&
              selectedInterview[selectedDate].map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
          </Select>
        </HopeTimeContainer>
        <SaveButton onClick={handleSave}>저장</SaveButton>
      </PopupContent>
    </PopupOverlay>
  );
};

export default TimePopup;
