import styled from "styled-components";
const ScrapGrid = styled.main`
  width: 100%;
  grid-gap: 10px;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  padding: 16px;
  .profileArea {
    display: none;
    @media (min-width: 860px) {
      display: block;
    }
  }
  @media (min-width: 860px) {
    max-width: 1110px;
    display: grid;
    grid-template-areas: "profileArea scrapArea";
    grid-template-columns: 160px 1fr;
  }

  .scrapArea {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 16px;
  }
`;
export default ScrapGrid;
