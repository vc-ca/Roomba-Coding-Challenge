import React, { useState } from "react";
import "./App.css";
import roombaData from "./data.json";

//Set up all the specs
const roomDimension = roombaData.roomDimensions;
let roombaLocation = [...roombaData.initialRoombaLocation];
let dirtLocations = roombaData.dirtLocations;
let drivingInstructions = roombaData.drivingInstructions;
let wallHits = 0;
let dirtCollected = 0;
let steps = 1;

//Used to compare roombaLocation to dirtLocation arrays
function arrayEquals(a, b) {
  return a.every((val, index) => val === b[index]);
}

//Data generated on each roomba step
let outputData = [
  {
    steps: 1,
    roombaLocation: roombaData.initialRoombaLocation,
    action: null,
    dirtCollected: 0,
    wallHits: 0,
  },
];

//Function takes N,S,E,W input and increments roomba, wallhits, dirt collected, step accordingly
const moveRoomba = (input) => {
  // Handle North Input
  if (input === "N") {
    if (roombaLocation[1] === roomDimension[1]) {
      wallHits++;
    } else {
      roombaLocation[1]++;
      console.log("Just checking the roomba location here: " + roombaLocation);

      //Check dirt locations to roombas current location. If there is a match, increment collected dirt, and then filter/remove it from the array
      dirtLocations = dirtLocations
        .filter(function (dirt) {
          const result = arrayEquals(roombaLocation, dirt);
          if (result) {
            dirtCollected++;
          }
          return dirt;
        })
        .map(function (dirt) {
          return dirt;
        });
    }
    // Handle South Input
  } else if (input === "S") {
    if (roombaLocation[1] === 0) {
      wallHits++;
      console.log("Hit the wall!");
      console.log("Total Wall Hits " + wallHits);
    } else {
      roombaLocation[1]--;
      console.log("Just checking the roomba location here: " + roombaLocation);

      //Check dirt locations to roombas current location. If there is a match, increment collected dirt, and then filter/remove it from the array
      dirtLocations = dirtLocations
        .filter(function (dirt) {
          const result = arrayEquals(roombaLocation, dirt);
          if (result) {
            dirtCollected++;
          }
          return dirt;
        })
        .map(function (dirt) {
          return dirt;
        });
    }
    // Handle East Input
  } else if (input === "E") {
    if (roombaLocation[0] === roomDimension[0]) {
      wallHits++;
      console.log("Hit the wall!");
      console.log("Total Wall Hits " + wallHits);
    } else {
      roombaLocation[0]++;
      console.log("Just checking the roomba location here: " + roombaLocation);

      //Check dirt locations to roombas current location. If there is a match, increment collected dirt, and then filter/remove it from the array
      dirtLocations = dirtLocations
        .filter(function (dirt) {
          const result = arrayEquals(roombaLocation, dirt);
          if (result) {
            dirtCollected++;
          }
          return dirt;
        })
        .map(function (dirt) {
          return dirt;
        });
    }
    // Handle West Input
  } else if (input === "W") {
    if (roombaLocation[0] === 1) {
      wallHits++;
      console.log("Hit the wall!");
      console.log("Total Wall Hits " + wallHits);
    } else {
      roombaLocation[0]--;
      console.log("Just checking the roomba location here: " + roombaLocation);

      //Check dirt locations to roombas current location. If there is a match, increment collected dirt, and then filter/remove it from the array
      dirtLocations = dirtLocations
        .filter(function (dirt) {
          const result = arrayEquals(roombaLocation, dirt);
          if (result) {
            dirtCollected++;
          }
          return dirt;
        })
        .map(function (dirt) {
          return dirt;
        });
    }
  } else {
    console.log(
      "You'll need to enter N, S, E , or W for your Roomba driving instructions"
    );
  }
  steps++;

  //Push results to outputData array, which will then map to react
  outputData.push({
    steps: steps,
    roombaLocation: [...roombaLocation],
    action: input,
    dirtCollected: dirtCollected,
    wallHits: wallHits,
  });
};

const renderOutput = () =>
  outputData.map((data) => (
    <tr>
      <td>{data.steps}</td>
      <td>
        {data.roombaLocation[0]}, {data.roombaLocation[1]}
      </td>
      <td>{data.action}</td>
      <td>{data.dirtCollected}</td>
      <td>{data.wallHits}</td>
    </tr>
  ));

const App = () => {
  const [showTable, setShowTable] = useState(false);

  const onClickHandler = () => {
    drivingInstructions.map((drive) => moveRoomba(drive));
    setShowTable(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Roomba Coding Challenge</h1>
        <div>
          <button onClick={onClickHandler}>Generate Table</button>
          {showTable ? (
            <React.Fragment>
              <table>
                <tbody>
                  <tr>
                    <td>Step</td>
                    <td>Roomba Location</td>
                    <td>Action</td>
                    <td>Total Dirt Collected</td>
                    <td>Total Wall Hits</td>
                  </tr>
                  {renderOutput()}
                </tbody>
              </table>
            </React.Fragment>
          ) : null}
          <h3>jesseking@gmail.com</h3>
        </div>
      </header>
    </div>
  );
};

export default App;
