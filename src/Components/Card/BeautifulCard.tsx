import React from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Text,
} from 'react-native';
import Share from 'react-native-share';
interface imageUrl {
  imageUrl: string;
}
const BeautifulCard = ({imageUrl}: imageUrl) => {
  const handleDownload = () => {
    const {config, fs} = RNFetchBlob;
    const date = new Date();

    const {DownloadDir} = fs.dirs; // You can check the available directories in the wiki.
    const options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true, // true will use native manager and be shown on notification bar.
        notification: true,
        path: `${DownloadDir}/Wallpaper_${Math.floor(
          date.getTime() + date.getSeconds() / 2,
        )}.jpg`,
        description: 'Downloading.',
      },
    };

    config(options)
      .fetch('GET', imageUrl)
      .then(res => {
        Alert.alert('Download', 'Image downloaded successfully!');
      });
  };

  const handleShare = async () => {
    dwFile(imageUrl);
  };

  return (
    <View style={styles.card}>
      <Image source={{uri: imageUrl}} style={styles.image} resizeMode="cover" />
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.iconButton} onPress={handleDownload}>
          <Text>Download</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleShare}>
          <Text>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

function dwFile(file_url: string) {
  let imagePath: any = null;
  RNFetchBlob.config({
    fileCache: true,
  })
    .fetch('GET', file_url)
    // the image is now dowloaded to device's storage
    .then(resp => {
      // the image path you can use it directly with Image component
      imagePath = resp.path();
      return resp.readFile('base64');
    })
    .then(async base64Data => {
      let base64data: string = `data:image/png;base64,` + base64Data;
      // here's base64 encoded image
      await Share.open({url: base64data, message: 'Check out this amazing image!'});
      // remove the file from storage
      return RNFetchBlob.fs.unlink(imagePath);
    });
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 5,
    marginTop: 5,
  },
  image: {
    width: '100%',
    height: 200,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 10,
    flexDirection: 'row',
  },
  iconButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 8,
    borderRadius: 20,
    marginLeft: 10,
  },
});

export default BeautifulCard;
