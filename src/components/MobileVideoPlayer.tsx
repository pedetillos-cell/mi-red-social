// MobileVideoPlayer.tsx - Versión Windows-friendly
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';

interface MobileVideoPlayerProps {
  streamUrl: string;
  thumbnailUrl: string;
  isLive?: boolean;
}

export default function MobileVideoPlayer({ streamUrl, thumbnailUrl, isLive }: MobileVideoPlayerProps) {
  const [showControls, setShowControls] = useState(false);

  const openStream = () => {
    // En versión real, esto abriría el navegador o WebView
    console.log('Abriendo stream:', streamUrl);
    // Para POC: Mostrar thumbnail con overlay de play
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openStream} onLongPress={() => setShowControls(prev => !prev)}>
        <Image 
          source={{ uri: thumbnailUrl }} 
          style={styles.thumbnail}
        />
        
        {/* Overlay de play */}
        <View style={styles.playOverlay}>
          <Text style={styles.playIcon}>▶</Text>
        </View>

        {isLive && (
          <View style={styles.liveBadge}>
            <Text style={styles.liveText}>● LIVE</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  thumbnail: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  playIcon: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
  },
  liveBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#dc2626',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  liveText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});