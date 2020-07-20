import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  Platform,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

type Props = {
  value: Date;
  onChange: (date: Date) => void;
  styleAndroid?: StyleProp<ViewStyle>;
  textStyleAndroid?: StyleProp<TextStyle>;
};

const DatePicker: React.FC<Props> =
  Platform.OS == 'ios'
    ? ({ value, onChange }) => {
        return (
          <DateTimePicker
            value={value}
            onChange={(event, date) => {
              if (date) onChange(date);
            }}
          />
        );
      }
    : ({ value, onChange, styleAndroid, textStyleAndroid }) => {
        const [show, setShow] = useState(false);

        function handleChange(event: any, date?: Date) {
          setShow(false);

          if (date) {
            onChange(date);
          }
        }

        return (
          <>
            <TouchableOpacity
              style={styleAndroid}
              onPress={() => setShow(true)}
            >
              <Text style={textStyleAndroid}>{value.toLocaleDateString()}</Text>
            </TouchableOpacity>

            {show && <DateTimePicker value={value} onChange={handleChange} />}
          </>
        );
      };

export default DatePicker;
