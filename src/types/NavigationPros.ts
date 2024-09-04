import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';

export interface NavigProps<RouteParamsDataType> {
  navigation?: NavigationProp<ParamListBase>;
  route?: RouteProp<{params: {data: RouteParamsDataType}}, 'params'>;
}
// export interface HomeNavigProps<RouteParamsDataType> {
//   navigation?: DrawerNavigationProp<ParamListBase>;
//   route?: RouteProp<{params: {data: RouteParamsDataType}}, 'params'>;
// }
