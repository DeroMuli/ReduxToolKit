import { StyleSheet, Text, View , Button, SafeAreaView} from 'react-native';
import { Provider , useDispatch, useSelector } from 'react-redux';
import { store } from './store';
import type { RootState } from './store';
import { setMessage } from './message';

export default function App() {
  return (
    <Provider store={store}>
      <Message />
    </Provider>
  );
}

const Message = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state: RootState) => state.message);

  const handlePress = () => {
    dispatch(setMessage('Message from Component'));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      <View style={styles.button}>
      <Button title={'Set Message'} onPress={handlePress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection : "row"
  },
  text : {
    margin : 10,
    width : "60%",
    marginTop : 30,
    textAlign : "center",
    textAlignVertical : "center",
    height : 50
  },
  button : {
    margin : 10,
    height : 50,
    marginTop : 40
  }
});
