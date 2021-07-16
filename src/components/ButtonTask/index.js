import styled, { css } from "styled-components";

export const PropsBtn = css`
  background-color: #6f92bb;
  color: #ffffff;
`;

export const BtnTask = styled.button`
  padding: 9px 12px !important;
  background-color: #d9e6f6;
  border-radius: 8px !important;
  margin: 0 16px 10px;
  text-align: center;
  color: #2e7bb4;
  /* font-family: Rubik; */
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
`;

export const ButtonTask = ({ text, onClick }) => {
  return (
    <BtnTask onClick={onClick} name={text}>
      {text}
    </BtnTask>
  );
};
