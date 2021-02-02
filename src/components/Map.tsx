import React, { memo, useEffect, useRef } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { PatternLines } from '@vx/pattern';
import '../styles/Map.css';
const topo = require('../assets/topo.json');

const Map = () => {
  return (
    <div id="map-container">
      <ComposableMap id="main-map" data-tip="">
        <PatternLines
          id="lines"
          height={4}
          width={4}
          stroke="#776865"
          strokeWidth={0.5}
          background="lightsalmon"
          orientation={["diagonal"]}
        />
        <ZoomableGroup>
          <Geographies geography={topo}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  className="geography"
                  fill={'rgb(219, 219, 219)'}
                  onClick={() => console.log(geo.properties)}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  )
}

export default memo(Map);