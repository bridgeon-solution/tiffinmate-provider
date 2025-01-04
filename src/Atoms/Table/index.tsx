import { styled } from "@mui/material/styles";

export const StyledTable = styled("table")`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;

  & th, & td {
    padding: 8px;
    text-align: center;
    border-bottom: 1px solid #EEEEEE;
  }

  & th {
    font-weight: bold;
    color: #B5B7C0;
  }
`;
