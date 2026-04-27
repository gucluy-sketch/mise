import { View, Text, Image, StyleSheet } from 'react-native';
import { C } from './theme';

export default function RichText({ metin, style }) {
  if (!metin) return null;

  const parcalar = metin.split(/(\[IMG:[^\]]+\])/g);

  return (
    <View>
      {parcalar.map((parca, i) => {
        const imgMatch = parca.match(/^\[IMG:(.+)\]$/);
        if (imgMatch) {
          return (
            <Image
              key={i}
              source={{ uri: imgMatch[1].trim() }}
              style={s.gorsel}
              resizeMode="cover"
            />
          );
        }
        if (parca.trim() === '') return null;
        return (
          <Text key={i} style={[s.metin, style]}>
            {parca}
          </Text>
        );
      })}
    </View>
  );
}

const s = StyleSheet.create({
  metin: { fontSize: 16, color: C.text, lineHeight: 28, fontStyle: 'italic', fontWeight: '300' },
  gorsel: { width: '100%', height: 240, borderRadius: 12, marginVertical: 16 },
});