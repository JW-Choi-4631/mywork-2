import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "../components/GlobalStyle";
import { CHANGE } from "../redux/modules/Card";
import { CLEAR, CONTENT, TITLE, DATE } from "../redux/modules/Content";

const DetailContainer = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
  margin: 280px auto;
  font-size: 20px;
`;

const StyledDiv = styled.div`
  width: 33%;
  background-color: #d9d9d9;
  justify-content: center;
  padding: 5px;
  border-radius: 5px;
  opacity: 0.85;
`;

function Detail() {
  const navigate = useNavigate();
  const cardList = useSelector((state) => state.Card);
  const Content = useSelector((state) => state.Content);
  const dispatch = useDispatch();
  const params = useParams();
  const foundCard = cardList.find((card) => card.id === params.id);

  // Home 과 중복
  const contentChangeHandler = ({ target }) => {
    const { name, value } = target;
    switch (name) {
      case "title":
        dispatch(TITLE(value));
        break;
      case "context":
        dispatch(CONTENT(value));
        break;
      case "date":
        dispatch(DATE(value));
        break;
      default:
        break;
    }
  };

  //Complete Page와 중복됨
  const whenPageMovedInputValueClear = (page) => {
    dispatch(CLEAR());
    navigate(`${page}`);
  };

  const changeBtnClickHandler = () => {
    const newCard = {
      id: params.id,
      title: Content.title,
      context: Content.context,
      date: Content.date,
      isDone: false,
    };
    dispatch(CHANGE(newCard));
    whenPageMovedInputValueClear("/");
  };

  return (
    <>
      <GlobalStyle />
      <DetailContainer>
        <StyledDiv>
          <h1
            style={{
              textAlign: "center",
            }}
          >
            원문
          </h1>
          <p>ID : {foundCard.id}</p>
          <p>제목 : {foundCard.title}</p>
          <p>본문 : {foundCard.context}</p>
          <p>날짜 : {foundCard.date}</p>
        </StyledDiv>
        <StyledDiv>
          <h1
            style={{
              textAlign: "center",
            }}
          >
            변경
          </h1>
          <p>ID : {foundCard.id}</p>
          <p style={{}}>
            제목 :{" "}
            <input
              name="title"
              type="text"
              onChange={contentChangeHandler}
              placeholder={foundCard.title}
            />
          </p>
          <p
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            본문 :&nbsp;
            <textarea
              name="context"
              rows={5}
              type="text"
              onChange={contentChangeHandler}
              placeholder={foundCard.context}
            />
          </p>
          <p>
            날짜 :{" "}
            <input name="date" type="date" onChange={contentChangeHandler} />
          </p>
          <StyledDiv
            style={{
              display: "flex",
              width: "60%",
              marginLeft: 50,
              marginTop: 10,
              marginBottom: 10,
              gap: 20,
            }}
          >
            <button
              onClick={() => {
                whenPageMovedInputValueClear("/");
              }}
            >
              이전으로
            </button>
            <button onClick={changeBtnClickHandler}>수정하기</button>
          </StyledDiv>
        </StyledDiv>
      </DetailContainer>
    </>
  );
}

export default Detail;
