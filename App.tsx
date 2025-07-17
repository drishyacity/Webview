/**
 * Drishyacity WebView App
 * A robust webview application with error handling and offline support
 *
 * @format
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  BackHandler,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { WebView } from 'react-native-webview';
import * as Network from 'expo-network';
import * as SplashScreen from 'expo-splash-screen';
import Constants from 'expo-constants';

const WEBSITE_URL = 'https://drishyacity.netlify.app';
const { width, height } = Dimensions.get('window');

function App() {
  const [isConnected, setIsConnected] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(WEBSITE_URL);
  const [refreshing, setRefreshing] = useState(false);
  const webViewRef = useRef<WebView>(null);

  useEffect(() => {
    // Hide splash screen after component mounts
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };
    const timer = setTimeout(hideSplash, 2000);

    // Monitor network connectivity
    const checkNetworkStatus = async () => {
      const networkState = await Network.getNetworkStateAsync();
      setIsConnected(networkState.isConnected ?? false);
      if (networkState.isConnected && hasError) {
        setHasError(false);
        handleRefresh();
      }
    };

    // Check network status initially
    checkNetworkStatus();

    // Set up periodic network checking (since Expo doesn't have real-time listener)
    const networkInterval = setInterval(checkNetworkStatus, 3000);

    // Handle Android back button
    const backAction = () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      } else {
        // Navigate to home page if can't go back
        if (currentUrl !== WEBSITE_URL) {
          navigateToHome();
          return true;
        }
        return false;
      }
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      clearTimeout(timer);
      clearInterval(networkInterval);
      backHandler.remove();
    };
  }, [canGoBack, currentUrl, hasError]);

  const navigateToHome = () => {
    setCurrentUrl(WEBSITE_URL);
    setHasError(false);
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setHasError(false);
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleLoadStart = () => {
    setIsLoading(true);
    setHasError(false);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  const handleError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    console.log('WebView error: ', nativeEvent);
    setIsLoading(false);
    setHasError(true);

    // Show user-friendly error message
    Alert.alert(
      'Connection Error',
      'Unable to load the page. Please check your internet connection and try again.',
      [
        { text: 'Retry', onPress: handleRefresh },
        { text: 'Go Home', onPress: navigateToHome },
      ]
    );
  };

  const handleNavigationStateChange = (navState: any) => {
    setCanGoBack(navState.canGoBack);
    setCurrentUrl(navState.url);

    // Check if navigated to an invalid/unavailable link
    if (navState.url && !navState.url.includes('drishyacity.netlify.app') &&
        !navState.url.includes('about:blank')) {
      // If user navigated to external link that might not be available
      setTimeout(() => {
        if (hasError) {
          navigateToHome();
        }
      }, 5000);
    }
  };

  // Render offline screen
  if (!isConnected) {
    return (
      <View style={styles.fullScreenContainer}>
        <StatusBar style="dark" translucent backgroundColor="transparent" />
        <ScrollView
          contentContainerStyle={styles.offlineContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }>
          <Text style={styles.offlineTitle}>No Internet Connection</Text>
          <Text style={styles.offlineMessage}>
            Please check your internet connection and pull down to refresh.
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  // Render error screen
  if (hasError) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" backgroundColor="#FFFFFF" />
        <ScrollView
          contentContainerStyle={styles.errorContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }>
          <Text style={styles.errorTitle}>Page Not Available</Text>
          <Text style={styles.errorMessage}>
            The requested page could not be loaded. This might be due to a temporary issue.
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.homeButton} onPress={navigateToHome}>
              <Text style={styles.homeButtonText}>Go Home</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Render main WebView
  return (
    <View style={styles.fullScreenContainer}>
      <StatusBar style="dark" backgroundColor="#FFFFFF" />
      <View style={styles.statusBarSpacer} />
      <WebView
        ref={webViewRef}
        source={{ uri: currentUrl }}
        style={styles.webview}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        onNavigationStateChange={handleNavigationStateChange}
        startInLoadingState={true}
        scalesPageToFit={true}
        bounces={false}
        allowsBackForwardNavigationGestures={true}
        domStorageEnabled={true}
        javaScriptEnabled={true}
        mixedContentMode="compatibility"
        thirdPartyCookiesEnabled={true}
        userAgent="Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36 DrishyacityApp/1.0"
        pullToRefreshEnabled={true}
        onShouldStartLoadWithRequest={(request) => {
          // Allow navigation to drishyacity domain and common web protocols
          const url = request.url;
          if (url.startsWith('http') || url.startsWith('https')) {
            return true;
          }
          return false;
        }}
        renderError={(errorName) => (
          <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>Failed to Load</Text>
            <Text style={styles.errorMessage}>
              Error: {errorName}
            </Text>
            <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading Drishyacity...</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  statusBarSpacer: {
    height: Platform.OS === 'android' ? Constants.statusBarHeight + 10 : 0,
    backgroundColor: '#FFFFFF',
  },
  webview: {
    flex: 1,
  },
  offlineContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  offlineTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
    textAlign: 'center',
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
    textAlign: 'center',
  },
  offlineMessage: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  errorMessage: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  loadingText: {
    fontSize: 18,
    color: '#2196F3',
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 300,
  },
  retryButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  homeButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  homeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
