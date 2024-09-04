import { Assets, Colors } from "react-native-ui-lib";

import { Dimensions } from "react-native";

export const {height : Hight,width : Width} = Dimensions.get("screen")


Colors.loadSchemes({
    light: {
      screenBG: 'transparent',
      textColor: Colors.grey10,
      moonOrSun: Colors.yellow30,
      mountainForeground: Colors.green30,
      mountainBackground: Colors.green50,
      $backgroundSuccess: Colors.green40,
      $backgroundSuccessLight: Colors.green1,
      wbNormal: 'black',
    },
    dark: {
      screenBG: Colors.grey10,
      textColor: Colors.white,
      moonOrSun: Colors.grey80,
      mountainForeground: Colors.violet10,
      mountainBackground: Colors.violet20,
      $backgroundSuccess: Colors.green40,
      $backgroundSuccessLight: Colors.green40,
      wbNormal: 'white',
    },
  });
  
  Assets.loadAssetsGroup('icons', {
      accept: require('../assets/images/accept.png'),
      cancel: require('../assets/images/cancel.png'),
      video: require('../assets/images/videoIcons.png'),
      videoOf: require('../assets/images/videoOF.png'),
      videoOn: require('../assets/images/videoOn.png'),
      micOn: require('../assets/images/micOn.png'),
      micOf: require('../assets/images/micOf.png'),
      call: require('../assets/images/call.png'),
    });
