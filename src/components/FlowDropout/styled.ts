import styled from "@emotion/styled";

export const Container = styled.div`
  width: 70%;
  background: #fff;
  border-radius: 10px;
`;

export const Header = styled.div`
  height: 62px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px 0 20px;
  border-bottom: 1px solid #ecf2ff;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;

  > *:not(:first-child) {
    margin-left: 15px;
  }
`;

export const Body = styled.div`
  height: 522px;
  padding: 40px;
  overflow-y: auto;
`;
