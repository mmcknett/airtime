import React, { useState, useEffect } from 'react';
import { Button, ProgressViewIOS, Text, TouchableOpacity, View } from 'react-native';

export function Airpad(props) {
  const [nameTimes, setNameTimes] = useState(props.names.map(name => ({ name, time: 0 })));
  console.log('name times', nameTimes);

  const sum = nameTimes.reduce((total, nameTime) => { 
    console.log('total is', total, 'and nameTime is', nameTime);
    return total + nameTime.time;
  }, 0);
  console.log('sum', sum);

  useEffect(() => {
    setNameTimes(props.names.map(name => ({ name, time: 0 })));
  }, [props.names]);

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
    <View style={{ flex: 1, flexDirection: "column", maxWidth: '100%' }}>
      <Button title="Reset times" onPress={ resetAllTimes } style={{ marginBottom: 16 }} />
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
    </View>
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
        justifyContent: 'space-between',
        margin: 10
      }}
    >
      <ProgressViewIOS
        progress={ props.fraction }
        progressViewStyle='bar'
        style={{ flex: -1, minWidth: 150, width: 150, alignSelf: 'center' }}/>
      <TouchableOpacity
        title={ props.name }
        onPressIn={ onPressIn }
        onPressOut={ onPressOut }
        style={{
          borderRadius: 5,
          borderStyle: 'solid',
          backgroundColor: '#B0C0E0',
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginLeft: 20,
          flexShrink: 1,
        }}
      >
        <Text style={{ fontSize: 28, lineHeight: 50 }} numberOfLines={1}>{ props.name }</Text>
      </TouchableOpacity>
    </View>
  );
}
