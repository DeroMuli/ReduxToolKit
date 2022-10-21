import { StyleSheet, Text, View , Button, ActivityIndicator} from 'react-native';
import { Provider , useDispatch, useSelector  } from 'react-redux';
import { store } from './store';
import type { RootState , AppDispatch} from './store';
import { setMessage } from './message';
import { fetchUsers } from './users';
import { useEffect } from 'react';

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.maincontainer}>
      <Message />
      <View style={styles.userscontainer}>
      <Users />
    </View>
      </View>
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
    <View style={styles.uppercontainer}>
      <Text style={styles.text}>{message}</Text>
      <View style={styles.button}>
      <Button title={'Set Message'} onPress={handlePress} />
      </View>
    </View>
  );
};

const Users = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading } = useSelector((state: RootState) => state.users)

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View>
      <View style={styles.reloadbutton}>
      <Button title={'Reload'} onPress={() => {dispatch(fetchUsers())} } />
      </View>
      {users.map((user) => {
        return (
          <View style={styles.container} key={user.id}>
            <View>
              <View style={styles.datacontainer}>
                <Text>
                  {user.first_name} {user.last_name}
                </Text>
              </View>
              <View style={styles.datacontainer}>
                <Text>{user.email}</Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer : {
    flex : 1,
    backgroundColor: '#fff',
  },
  userscontainer : {
    flex : 3,
    backgroundColor: '#fff',
  },
  uppercontainer: {
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
  },
  datacontainer : {
    alignItems : "center"
  },
  container : {
    borderWidth : 2,
    borderRadius : 10,
    margin : 10
  },
  reloadbutton : {
    alignItems : "center"
  }
});
