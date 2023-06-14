import * as React from 'react';
import {useState} from 'react';
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
  QualitySubMenu,
  SeekBar,
  SettingsMenuButton,
  SkipButton,
  Spacer,
  TimeLabel,
  UiContainer,
} from '@theoplayer/react-native-ui';
import {
  PlayerConfiguration,
  PlayerEventType,
  THEOplayer,
  THEOplayerView,
} from 'react-native-theoplayer';

import {Platform, StyleSheet, View, ViewStyle} from 'react-native';
import {SourceMenuButton, SOURCES} from './custom/SourceMenuButton';

const playerConfig: PlayerConfiguration = {
  // Get your THEOplayer license from https://portal.theoplayer.com/
  // Without a license, only demo sources hosted on '*.theoplayer.com' domains can be played.
  license:
    'sZP7IYe6T6P6IS5oTSR_C6zr3QBoFSakISh-TS0oTOzc0QX6IQ31ClfzTDC6FOPlUY3zWokgbgjNIOf9flI6ISfZClBLFSAK0Sa-3uX1TOz_CSf_FS36Il3gCDIgTuR_I6fVfK4_bQgZCYxNWoryIQXzImf90SC_3LaZTu5i0u5i0Oi6Io4pIYP1UQgqWgjeCYxgflEc3lRo0leo3l0Z0ueiFOPeWok1dDrLYtA1Ioh6TgV6v6fVfKcqCoXVdQjLUOfVfGxEIDjiWQXrIYfpCoj-fgzVfKxqWDXNWG3ybojkbK3gflNWf6E6FOPVWo31WQ1qbta6FOPzdQ4qbQc1sD4ZFK3qWmPUFOPLIQ-LflNWfK1zWDikf6i6CDrebKjNIOfVfKXpIwPqdDxzU6fVfKINbK4zU6fVfKgqbZfVfGxNsK4pf6i6UwIqbZfVfGUgCKjLfgzVfG3gWKxydDkibK4LbogqW6f9UwPkImi6IK41Uw4ZIY06Tg-Uya',
  chromeless: true,
  libraryLocation: 'theoplayer',
  cast: {
    chromecast: {
      appID: 'CC1AD845',
    },
    strategy: 'auto',
  },
  mediaControl: {
    mediaSessionEnabled: true,
  },
};

/**
 * The example app demonstrates the use of the THEOplayerView with a custom UI using the provided UI components.
 * If you don't want to create a custom UI, you can just use the THEOplayerDefaultUi component instead.
 */
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
    player.source = SOURCES[0].source;

    player.backgroundAudioConfiguration = {enabled: true};
    player.pipConfiguration = {startsAutomatically: true};
  };

  const needsBorder = Platform.OS === 'ios';
  const PLAYER_CONTAINER_STYLE: ViewStyle = {
    position: 'absolute',
    top: needsBorder ? 20 : 0,
    left: needsBorder ? 5 : 0,
    bottom: 0,
    right: needsBorder ? 5 : 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
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
                  <SourceMenuButton />
                  {!Platform.isTV && (
                    <>
                      <AirplayButton />
                      <ChromecastButton />
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
