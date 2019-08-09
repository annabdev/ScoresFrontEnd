import React from 'react';
import Select from 'react-select';
import styled from 'styled-components'

const customStyles = (width=40, height=40) => {
  return {
    container: (base) => ({
      ...base,
      display:'inline-block',
      width: width,
    }),
    valueContainer: (base) => ({
      ...base,
      minHeight: height,
    })
  }
}

const games = [
  { label: "Ms. Pac-Man", value: 1 },
  { label: "Iron Maiden Pinball", value: 2 },
  { label: "Donkey Kong Jr", value: 3 },
  { label: "Skeeball", value: 4 }
];

const SelGame = () => (
  <div>
        <Select 
        options={ games } />
     
  </div>
);

export default SelGame;