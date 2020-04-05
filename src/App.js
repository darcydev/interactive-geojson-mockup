import React, { Component } from 'react';
import MapGL, { Source, Layer } from 'react-map-gl';
import styled from 'styled-components';

import ControlPanel from './components/ControlPanel';
import { dataLayer } from './data/map-style.js';
import { updatePercentiles } from './helpers/update-percentiles';
import { json as requestJson } from 'd3-request';
import Tooltip from './components/Tooltip';

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

  render() {
    const { viewport, data, hoveredFeature, x, y } = this.state;

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
          {hoveredFeature && (
            <Tooltip hoveredFeature={hoveredFeature} x={x} y={y} />
          )}
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
