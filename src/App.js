import React, { Component } from 'react';
import MapGL, { Source, Layer } from 'react-map-gl';
import styled from 'styled-components';

import ControlPanel from './components/ControlPanel';
import { dataLayer } from './data/map-style.js';
import { updatePercentiles } from './helpers/update-percentiles';
import { json as requestJson } from 'd3-request';

export default class App extends Component {
  state = {
    year: 2019,
    data: null,
    hoveredFeature: null,
    viewport: {
      latitude: -25.3444,
      longitude: 131.0369,
      zoom: 3.5,
      bearing: 0,
      pitch: 0,
    },
  };

  componentDidMount() {
    requestJson(
      'https://raw.githubusercontent.com/darcydev/interactive-geojson-mockup/master/src/data/australian-states.geojson',
      (error, response) => {
        if (!error) {
          this._loadData(response);
        }
      }
    );
  }

  _loadData = (data) => {
    this.setState({
      data: updatePercentiles(
        data,
        (f) => f.properties.income[this.state.year]
      ),
    });
  };

  _updateSettings = (name, value) => {
    if (name === 'year') {
      this.setState({ year: value });

      const { data } = this.state;
      if (data) {
        // trigger update
        this.setState({
          data: updatePercentiles(data, (f) => f.properties.income[value]),
        });
      }
    }
  };

  _onViewportChange = (viewport) => this.setState({ viewport });

  _onHover = (event) => {
    const {
      features,
      srcEvent: { offsetX, offsetY },
    } = event;
    const hoveredFeature =
      features && features.find((f) => f.layer.id === 'data');

    this.setState({ hoveredFeature, x: offsetX, y: offsetY });
  };

  _renderTooltip() {
    const { hoveredFeature, x, y } = this.state;

    return (
      hoveredFeature && (
        <StyledTooltip style={{ left: x, top: y }}>
          <div>State: {hoveredFeature.properties.name}</div>
          <div>Median Household Income: {hoveredFeature.properties.value}</div>
          <div>
            Percentile: {(hoveredFeature.properties.percentile / 8) * 100}
          </div>
        </StyledTooltip>
      )
    );
  }

  render() {
    const { viewport, data } = this.state;

    return (
      <div style={{ height: '100vh', position: 'relative' }}>
        <MapGL
          {...viewport}
          width='100%'
          height='100%'
          mapStyle='mapbox://styles/mapbox/light-v9'
          onViewportChange={this._onViewportChange}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          onHover={this._onHover}
        >
          <Source type='geojson' data={data}>
            <Layer {...dataLayer} />
          </Source>
          {this._renderTooltip()}
        </MapGL>

        <ControlPanel
          containerComponent={this.props.containerComponent}
          settings={this.state}
          onChange={this._updateSettings}
        />
      </div>
    );
  }
}

const StyledTooltip = styled.div`
  position: absolute;
  margin: 8px;
  padding: 4px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  max-width: 300px;
  font-size: 20px;
  z-index: 9;
  pointer-events: none;
`;
