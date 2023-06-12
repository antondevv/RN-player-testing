import * as React from 'react';
import {useState} from 'react';
import {Platform, StyleSheet, View, ViewStyle} from 'react-native';
import {
  AirplayButton,
  CastMessage,
  CenteredControlBar,
  CenteredDelayedActivityIndicator,
  ChromecastButton,
  ControlBar,
  DEFAULT_THEOPLAYER_THEME,
  FullscreenButton,
  LanguageMenuButton,
  MuteButton,
  PipButton,
  PlaybackRateSubMenu,
  PlayButton,
  PlayerConfiguration,
  PlayerEventType,
  QualitySubMenu,
  SeekBar,
  SettingsMenuButton,
  SkipButton,
  SourceDescription,
  Spacer,
  THEOplayer,
  THEOplayerView,
  TimeLabel,
  UiContainer,
} from 'react-native-theoplayer';

const playerConfig: PlayerConfiguration = {
  cast: {
    strategy: 'auto',
  },
  chromeless: true,
  libraryLocation: 'theoplayer',
  // Get your THEOplayer license from https://portal.theoplayer.com/
  // Without a license, only demo sources hosted on '*.theoplayer.com' domains can be played.
  license: undefined,
  mediaControl: {
    mediaSessionEnabled: true,
  },
};

const source: SourceDescription = {
  sources: [
    {
      src: 'https://stream.mux.com/uq4xV7o02Z8lwnJn02G3C4GN2gl1b9VHTdp3WmZPjKVFw.m3u8',
      type: 'application/vnd.apple.mpegurl',
    },
  ],
};

export default function App() {
  const [player, setPlayer] = useState<THEOplayer | undefined>(undefined);
  const chromeless = playerConfig?.chromeless ?? false;
  const onPlayerReady = (player: THEOplayer) => {
    setPlayer(player);
    // optional debug logs
    player.addEventListener(PlayerEventType.SOURCE_CHANGE, console.log);
    player.addEventListener(PlayerEventType.LOADED_DATA, console.log);
    player.addEventListener(PlayerEventType.LOADED_METADATA, console.log);
    player.addEventListener(PlayerEventType.READYSTATE_CHANGE, console.log);
    player.addEventListener(PlayerEventType.PLAY, console.log);
    player.addEventListener(PlayerEventType.PLAYING, console.log);
    player.addEventListener(PlayerEventType.PAUSE, console.log);
    player.addEventListener(PlayerEventType.SEEKING, console.log);
    player.addEventListener(PlayerEventType.SEEKED, console.log);
    player.addEventListener(PlayerEventType.ENDED, console.log);
    player.source = source;

    player.backgroundAudioConfiguration = {enabled: true};
    player.pipConfiguration = {startsAutomatically: true};
  };

  const needsBorder = Platform.OS === 'ios';
  const PLAYER_CONTAINER_STYLE: ViewStyle = {
    alignItems: 'center',
    backgroundColor: '#000000',
    bottom: 0,
    justifyContent: 'center',
    left: needsBorder ? 5 : 0,
    position: 'absolute',
    right: needsBorder ? 5 : 0,
    top: needsBorder ? 20 : 0,
  };

  return (
    <View style={[StyleSheet.absoluteFill, {backgroundColor: '#000000'}]}>
      <View style={PLAYER_CONTAINER_STYLE}>
        <THEOplayerView config={playerConfig} onPlayerReady={onPlayerReady}>
          {player !== undefined && chromeless && (
            <UiContainer
              theme={{...DEFAULT_THEOPLAYER_THEME}}
              player={player}
              behind={<CenteredDelayedActivityIndicator size={50} />}
              top={
                <ControlBar>
                  {/*This is a custom menu for source selection.*/}
                  {/* <SourceMenuButton /> */}
                  {!Platform.isTV && (
                    <>
                      <AirplayButton />
                      {/* <ChromecastButton /> */}
                    </>
                  )}
                  <LanguageMenuButton />
                  <SettingsMenuButton>
                    {/*Note: quality selection is not available on iOS */}
                    <QualitySubMenu />
                    <PlaybackRateSubMenu />
                  </SettingsMenuButton>
                </ControlBar>
              }
              center={
                <CenteredControlBar
                  left={<SkipButton skip={-10} />}
                  middle={<PlayButton />}
                  right={<SkipButton skip={30} />}
                />
              }
              bottom={
                <>
                  <ControlBar style={{justifyContent: 'flex-start'}}>
                    <CastMessage />
                  </ControlBar>
                  <ControlBar>
                    <SeekBar />
                  </ControlBar>
                  <ControlBar>
                    <MuteButton />
                    <TimeLabel showDuration={true} />
                    <Spacer />
                    <PipButton />
                    <FullscreenButton />
                  </ControlBar>
                </>
              }
            />
          )}
        </THEOplayerView>
      </View>
    </View>
  );
}

// import React from 'react';
// import {Platform, View} from 'react-native';
// import {
//   PlayerConfiguration,
//   SourceDescription,
//   PlayerEventType,
//   THEOplayer,
//   THEOplayerView,
// } from 'react-native-theoplayer';

// const playerConfig: PlayerConfiguration = {
//   license: undefined, // insert THEOplayer React Native license here
// };

// const source: SourceDescription = {
//   sources: [
//     {
//       src: 'https://cdn.theoplayer.com/video/elephants-dream/playlist-single-audio.m3u8',
//       type: 'application/x-mpegurl',
//     },
//   ],
// };

// const onReady = (player: THEOplayer) => {
//   player.autoplay = true;
//   player.source = source;
//   player.addEventListener(PlayerEventType.ERROR, console.log);
// };

// const App = () => {
//   return (
//     <View style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}>
//       <THEOplayerView config={playerConfig} onPlayerReady={onReady} />
//     </View>
//   );
// };

// export default App;
