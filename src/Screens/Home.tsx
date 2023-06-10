import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
  FlatList,
  Image,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  Share,
  Alert,
} from 'react-native';
import {API_KEY} from '../utils/Constants';
import {requestSearchForPhotos} from '../utils/Request';
import {useEffect, useState} from 'react';
import BeautifulCard from '../Components/Card/BeautifulCard';

export function Home(): JSX.Element {
  interface wallpapers {
    alt: String;
    avg_color: String;
    height: Number;
    id: Number;
    liked: Boolean;
    photographer: String;
    photographer_id: Number;
    photographer_url: String;
    src: {
      landscape: String;
      large: String;
      large2x: String;
      medium: String;
      original: String;
      portrait: String;
      small: String;
      tiny: String;
    };
    url: String;
    width: Number;
  }

  let [wallpapers, setWallpapers] = useState(Array<wallpapers>);
  let [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  async function request(isChanged: boolean) {
    setIsLoading(true);
    let response = await requestSearchForPhotos(searchQuery, page);
    let photos: Array<wallpapers> = response.data.photos;
    if (isChanged) {
      setWallpapers([...photos]);
    } else {
      setWallpapers([...wallpapers, ...photos]);
    }
    setIsLoading(false);
  }
  const handleDownload = () => {
    // Implement your download logic here
    Alert.alert('Download', 'Image downloaded successfully!');
  };
  const handleShare = async (imageUrl: string) => {
    try {
      await Share.share({
        message: 'Check out this amazing image!',
        url: imageUrl,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share image');
    }
  };
  useEffect(() => {
    if (page != 1) {
      request(false);
    }
    return () => {
      //
    };
  }, [page]);

  const handleSearch = () => {
    setSearchQuery(searchQuery.toLowerCase());
    request(true);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          color: 'black',
        }}
        placeholder="Enter search query"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <Button title="Search" onPress={handleSearch} />
      {isLoading ? (
        <ActivityIndicator style={styles.spinner} size="large" color="blue" />
      ) : (
        <FlatList
          data={wallpapers}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <BeautifulCard imageUrl={item.src.landscape.toString()} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  spinner: {
    padding: 10,
    margin: 10,
    height: 100,
  },
});
