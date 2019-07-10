import React, { useState } from 'react';
import { Button, ProgressViewIOS, Text, TouchableOpacity, View } from 'react-native';

export function Airpad(props) {
  const [nameTimes, setNameTimes] = useState([
    { name: 'Matt', time: 0 },
    { name: 'Amy', time: 0 }
  ]);

  const sum = nameTimes.reduce((a, b) => a.time + b.time);

  const addTime = (index, timeToAdd) => {
    const newNameTimes = nameTimes.slice();
    newNameTimes[index].time += timeToAdd;
    console.log('name times', newNameTimes);
    setNameTimes(newNameTimes);
  }

  resetAllTimes = () => {
    const newNameTimes = nameTimes.slice();
    newNameTimes.forEach(nameTime => { nameTime.time = 0; });
    console.log('name times', newNameTimes);
    setNameTimes(newNameTimes);
  }

  return (
    <>
      { 
        nameTimes.map(
          ({ name, time }, index) => 
            <NameTime
              key={ name }
              name={ name }
              fraction={ sum == 0 ? 0.01 : time / sum }
              addTime={ timeToAdd => addTime(index, timeToAdd) }
            />
        )
      }
      <Button title="Reset times" onPress={ resetAllTimes } />
    </>
  );
}

function NameTime(props) {
  const [lastPushTime, setLastPushTime] = useState(null);

  const onPressIn = () => {
    const now = new Date();
    setLastPushTime(now);
    console.log('Pressed:', now);
  }
  const onPressOut = () => {
    const timeToAdd = new Date() - lastPushTime;
    props.addTime(timeToAdd);
    setLastPushTime(null);
    console.log('Released:', timeToAdd);
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20
      }}
    >
      <ProgressViewIOS
        progress={ props.fraction }
        progressViewStyle='bar'
        style={{ width: 150, alignSelf: 'center' }}/>
      <TouchableOpacity
        title={ props.name }
        onPressIn={ onPressIn }
        onPressOut={ onPressOut }
        style={{ border: 1 }}
      >
        <Text style={{ fontSize: 24 }}>{ props.name }</Text>
      </TouchableOpacity>
    </View>
  );
}
