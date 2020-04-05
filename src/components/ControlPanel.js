import React, { PureComponent } from 'react';

export default class ControlPanel extends PureComponent {
  render() {
    const { settings } = this.props;

    return (
      <div className='control-panel'>
        <h3>Interactive GeoJSON</h3>
        <p>
          Map showing median household income by state in year{' '}
          <b>{settings.year}</b>. Hover over a state to see details.
        </p>
        <p>
          Data source: <a href='www.census.gov'>US Census Bureau</a>
        </p>
        <hr />

        <div key={'year'} className='input'>
          <label>Year</label>
          <input
            type='range'
            value={settings.year}
            min={2000}
            max={2019}
            step={1}
            onChange={(evt) => this.props.onChange('year', evt.target.value)}
          />
        </div>
      </div>
    );
  }
}
