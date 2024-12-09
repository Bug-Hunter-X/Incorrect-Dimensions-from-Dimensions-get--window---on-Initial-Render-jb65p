The solution involves using the `useEffect` hook to fetch the dimensions after the component has mounted.  This ensures the dimensions are accurate.  Additionally, the solution includes error handling to gracefully handle potential issues. 

```javascript
import React, { useEffect, useState } from 'react';
import { Dimensions, View, Text, ActivityIndicator } from 'react-native';

const MyComponent = () => {
  const [screenHeight, setScreenHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getDimensions = async () => {
      try {
        const { height } = await new Promise(resolve => {
          Dimensions.addEventListener('change', ({ window }) => resolve(window));
        });
        setScreenHeight(height);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching dimensions:', error);
        setIsLoading(false);
      }
    };

    getDimensions();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={{ height: screenHeight }}>
          <Text>Screen Height: {screenHeight}</Text>
        </View>
      )}
    </View>
  );
};

export default MyComponent;
```