import React, { PureComponent } from 'react';
import styled from 'styled-components';

export default class ControlPanel extends PureComponent {
  render() {
    const { settings } = this.props;

    return (
      <StyledContainer className='control-panel'>
        <h3>States by GDP per capita</h3>
        <p>
          Interactive map of GDP per capita by State in Year
          <b> {settings.year}</b>
          <br />
          Hover over a state to see more details.
        </p>
        <hr />

        <div key={'year'} className='input'>
          <label>Year</label>
          <StyledInput
            type='range'
            value={settings.year}
            min={2000}
            max={2019}
            step={1}
            onChange={(evt) => this.props.onChange('year', evt.target.value)}
          />
        </div>
      </StyledContainer>
    );
  }
}

const StyledContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  max-width: 370px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  background: black;
  padding: 12px 24px;
  margin: 20px;
  font-size: 16px;
  line-height: 2;
  color: #6b6b76;
  outline: none;
  text-transform: uppercase;
`;

const StyledInput = styled.input``;
