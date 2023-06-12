import {View} from 'react-native';
import {
  PlayerConfiguration,
  SourceDescription,
  PlayerEventType,
  THEOplayer,
  THEOplayerView,
} from 'react-native-theoplayer';

const playerConfig: PlayerConfiguration = {
  license: undefined,
};

const source: SourceDescription = {
  sources: [
    {
      src: 'https://stream.mux.com/uq4xV7o02Z8lwnJn02G3C4GN2gl1b9VHTdp3WmZPjKVFw.m3u8',
      type: 'application/vnd.apple.mpegurl',
    },
  ],
};

const onReady = (player: THEOplayer) => {
  player.autoplay = true;
  player.source = source;
  player.addEventListener(PlayerEventType.ERROR, console.log);
};

const App = () => {
  return (
    <View
      style={{position: 'absolute', top: 50, left: 50, bottom: 50, right: 50}}>
      <THEOplayerView config={playerConfig} onPlayerReady={onReady} />
    </View>
  );
};

export default App;
