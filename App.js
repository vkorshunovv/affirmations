import { StyleSheet, View} from 'react-native';
import { AnimatedButton } from './components/AnimatedButton';

const App = () => {
  return (
    <View style={styles.app}>
      <AnimatedButton />
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default App;
