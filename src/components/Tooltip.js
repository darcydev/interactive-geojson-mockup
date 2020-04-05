import React from 'react';
import styled from 'styled-components';

export default function Tooltip({ hoveredFeature, x, y }) {
  return (
    <StyledTooltip style={{ left: x, top: y }}>
      <div>State: {hoveredFeature.properties.STATE_NAME}</div>
      <div>GDP per capita: ${hoveredFeature.properties.value}</div>
      <div>Percentile: {(hoveredFeature.properties.percentile / 8) * 100}</div>
    </StyledTooltip>
  );
}

const StyledTooltip = styled.div`
  position: absolute;
  margin: 8px;
  padding: 4px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  color: #fff;
  max-width: 300px;
  font-size: 20px;
  z-index: 9;
  pointer-events: none;
`;
