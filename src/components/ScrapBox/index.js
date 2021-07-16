import styled from "styled-components";
import Box from "../Box";

export const ScrapBox = styled.div`
  max-width: 891px;
  width: 100%;
  height: 124px;
  background-color: ${(props) =>
    props.color % 2 === 0 ? "#d9e6f6" : "#F1F9FE"};
  display: flex;

  border-top-left-radius: ${(props) => (props.color === 0 ? "8px" : 0)};
  border-top-right-radius: ${(props) => (props.color === 0 ? "8px" : 0)};

  @media (max-width: 263px) {
    flex-wrap: wrap;
    height: auto;
    justify-content: center;
  }

  &:last-of-type {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

export const BoxTitle = styled(Box)`
  padding: 0;
`;

export const AvatarStyled = styled.img`
  border-radius: 50%;
  padding: 16px;
`;

export const ContainerInfoStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 7px;

  @media (max-width: 263px) {
    align-items: center;
    gap: 0;
  }
`;

export const ScrapTextStyled = styled.h4`
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  color: #2e7bb4;
`;

export const NameStyled = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  color: #5a5a5a;
`;
