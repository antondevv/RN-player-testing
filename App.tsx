import * as React from 'react';
import {useState} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ViewStyle,
  Text,
  ScrollView,
} from 'react-native';
import {
  AirplayButton,
  CastMessage,
  CenteredControlBar,
  CenteredDelayedActivityIndicator,
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
  license:
    'sZP7IYe6T6P6IS5oTSR_C6zr3QBoFSakISh-TS0oTOzc0QX6IQ31ClfzTDC6FOPlUY3zWokgbgjNIOf9flI6ISfZClBLFSAK0Sa-3uX1TOz_CSf_FS36Il3gCDIgTuR_I6fVfK4_bQgZCYxNWoryIQXzImf90SC_3LaZTu5i0u5i0Oi6Io4pIYP1UQgqWgjeCYxgflEc3lRo0leo3l0Z0ueiFOPeWok1dDrLYtA1Ioh6TgV6v6fVfKcqCoXVdQjLUOfVfGxEIDjiWQXrIYfpCoj-fgzVfKxqWDXNWG3ybojkbK3gflNWf6E6FOPVWo31WQ1qbta6FOPzdQ4qbQc1sD4ZFK3qWmPUFOPLIQ-LflNWfK1zWDikf6i6CDrebKjNIOfVfKXpIwPqdDxzU6fVfKINbK4zU6fVfKgqbZfVfGxNsK4pf6i6UwIqbZfVfGUgCKjLfgzVfG3gWKxydDkibK4LbogqW6f9UwPkImi6IK41Uw4ZIY06Tg-Uya',
  mediaControl: {
    mediaSessionEnabled: true,
  },
};

const source: SourceDescription = {
  sources: [
    {
      src: 'https://cdn.theoplayer.com/video/big_buck_bunny/big_buck_bunny.m3u8',
      // type: 'application/vnd.apple.mpegurl',
    },
  ],
  textTracks: [
    {
      default: true,
      src: 'https://cdn.theoplayer.com/dash/theoplayer/thumbnails/big_buck_bunny_thumbnails.vtt',
      label: 'thumbnails',
      kind: 'metadata',
    },
  ],
  poster: 'https://cdn.theoplayer.com/video/big_buck_bunny/poster.jpg',
  metadata: {
    title: 'Big Buck Bunny',
    subtitle: 'DASH - Thumbnails in manifest',
    album: 'React-Native THEOplayer demos',
    mediaUri: 'https://theoplayer.com',
    displayIconUri:
      'https://cdn.theoplayer.com/video/big_buck_bunny/poster.jpg',
    artist: 'THEOplayer',
  },
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
    // height: '30%',
  };

  return (
    <View style={[StyleSheet.absoluteFill, {backgroundColor: '#000'}]}>
      <View style={PLAYER_CONTAINER_STYLE}>
        <THEOplayerView config={playerConfig} onPlayerReady={onPlayerReady}>
          {player !== undefined && chromeless && (
            <UiContainer
              theme={{
                ...DEFAULT_THEOPLAYER_THEME,
              }}
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
                    <SeekBar style={{backgroundColor: 'red'}} />
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
