import React, { useState } from 'react';
import { Button, ProgressViewIOS, View } from 'react-native';

export function Airpad(props) {
  const [nameTimes, setNameTimes] = useState([
    { name: 'Matt', time: 10 },
    { name: 'Amy', time: 50 }
  ]);

  const sum = nameTimes.reduce((a, b) => a.time + b.time);

  return nameTimes.map(({ name, time }) => <NameTime name={ name } fraction={ time / sum } />);
}

function NameTime(props) {
  return (
    <View style={{ flex: 1, flexDirection: 'row', width: 200, justifyContent: 'space-around' }} >
      <ProgressViewIOS
        progress={ props.fraction }
        progressViewStyle='bar'
        style={{ width: 100, alignSelf: 'center' }}/>
      <Button title={ props.name } />
    </View>
  );
}
