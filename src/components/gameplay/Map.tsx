import React, { memo, useContext, useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { PatternLines } from '@vx/pattern';
import { observer } from 'mobx-react-lite';
import { GameContext } from '../../App';
import './Map.css';
const mapData = require('../../assets/topo.json');

interface Props {
  setTooltip: (content: string) => void,
  setAnswerSelectorPos: (coords: [number, number]) => void
}

const Map: React.FC<Props> = ({ setTooltip, setAnswerSelectorPos }) => {
  const [isPanning, setIsPanning] = useState(false);
  const game = useContext(GameContext);
  const activeCountryId = game.activeCountryId;
  const answerOptions = game.answerOptions;
  const userGuesses = game.userGuesses;
  const mousePos = useMousePosition();

  function handleClickCountry(countryName: string, countryId: number) {
    if (game.isGameOver) return;
    if (game.answerOptions.includes(countryName)) {
      setAnswerSelectorPos([mousePos[0], mousePos[1]]);
      game.setActiveCountryId(countryId);
    }
    setTooltip('');
  }

  function removeCountryFocus() {
    game.setActiveCountryId(-1);
    try {
      (document.activeElement as HTMLElement).blur();
    } catch {}
  }

  return (
    <>
      <div id="map-container">
        <ComposableMap id="main-map" data-tip="" onMouseEnter={removeCountryFocus}>
          <PatternLines
            id="answered" height={4} width={4} stroke="#776865" strokeWidth={0.5}
            background="skyblue" orientation={["diagonal"]}
          />
          <ZoomableGroup center={[16, 0]} onMoveStart={() => setIsPanning(true)} onMoveEnd={() => setIsPanning(false)}>
            <Geographies geography={mapData}>
              {({ geographies }) =>
                geographies.map(geo => {
                  const countryId = parseInt(geo.rsmKey.split('-')[1]);
                  const countryName = game.getCountryNameById(countryId);
                  const userGuess = userGuesses.find(ans => ans.id === countryId)?.countryName;
                  const isCompleted = game.completedCountries.includes(countryName);
                  const isAnswerOption = answerOptions.includes(countryName);
                  return (<Geography
                    key={geo.rsmKey}
                    geography={geo}
                    className={`
                      geography 
                      ${isAnswerOption && (!!userGuess ? 'country-answered' : 'country-answer-option')} 
                      ${isCompleted && 'country-completed'} 
                      ${activeCountryId === countryId && 'country-active'}
                    `}
                    fill={isAnswerOption ?
                      (!!userGuess ? 'url(#answered)' : 'orange')
                      : 'rgb(225, 225, 225)'
                    }
                    onFocus={() => handleClickCountry(countryName, countryId)}
                    onMouseEnter={() => setTooltip(isPanning ? '' : (isAnswerOption ? `${userGuess}?` : (isCompleted ? countryName : '')))}
                    onMouseLeave={() => setTooltip('')}
                  />)
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </>
  )
}

function useMousePosition() {
  const [mousePos, setMousePos] = useState([0,0]);

  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      setMousePos([e.clientX, e.clientY]);
    }
    document.addEventListener('mousedown', handleMouseDown, true)
    return () => document.removeEventListener('mousedown', handleMouseDown, true);
  }, [])

  return mousePos;
}

export default memo(observer(Map));