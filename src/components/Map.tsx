import React, { memo } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { PatternLines } from '@vx/pattern';
import '../styles/Map.css';
const mapData = require('../assets/topo.json');

interface Props {
  completed: string[], 
  answerOptions: string[],
  setTooltip: (content: string) => void
}

const Map: React.FC<Props> = ({ completed, answerOptions, setTooltip }) => {
  return (
    <div id="map-container">
      <ComposableMap id="main-map" data-tip="">
        <PatternLines
          id="lines"
          height={4}
          width={4}
          stroke="#776865"
          strokeWidth={0.5}
          background="orange"
          orientation={["diagonal"]}
        />
        <ZoomableGroup>
          <Geographies geography={mapData}>
            {({ geographies }) =>
              geographies.map(geo => {
                const countryName = geo.properties.NAME;
                const isCompleted = completed.includes(countryName);
                const isAnswerOption = answerOptions.includes(countryName);
                return (<Geography
                  key={geo.rsmKey}
                  geography={geo}
                  className={`geography ${isAnswerOption && 'country-answer-option'}`}
                  fill={
                    isAnswerOption ?
                      'url(#lines)'
                      :
                      (isCompleted ?
                        'rgb(190, 222, 190)'
                        : 'rgb(225, 225, 225)')
                  }
                  onClick={() => console.log(geo)}
                  onMouseEnter={() => setTooltip(isCompleted ? countryName : '')}
                  onMouseLeave={() => setTooltip('')}
                />)
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  )
}

export default memo(Map);