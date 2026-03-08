import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import getUserAvatarRStyles from '../styles/UserAvatarRStyles';

export default function UserAvatarR({ s }) {
	const navigation = useNavigation();
  const styles = getUserAvatarRStyles(s);

  return (
		<TouchableOpacity onPress={() => navigation.navigate('PerfilR')} activeOpacity={0.85}>
			<View style={styles.avatarCircle}>
				<Image source={require('../../../images/usuario.png')} style={styles.avatarImage} resizeMode="cover" />
			</View>
		</TouchableOpacity>
  );
}
