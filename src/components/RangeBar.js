import React from 'react';
import styled from 'styled-components';

export default function RangeBar() {
  return (
    <OuterBar>
      <InnerBar />
    </OuterBar>
  );
}

const OuterBar = styled.div`
  background-color: whiteSmoke;
  border-radius: 3px;
  box-shadow: 0 2px 3px rgba(208, 208, 208, 0.5) inset;
  width: 100%;
  height: 10px;
`;

const InnerBar = styled.span`
  display: block;
  width: 100%;
  height: 12px;
  border-radius: 3px;
  background: linear-gradient(45deg, green, yellow, red);
`;
