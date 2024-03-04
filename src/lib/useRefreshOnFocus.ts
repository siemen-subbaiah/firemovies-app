import * as React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { User } from 'firebase/auth';

export function useRefreshOnFocus(
  refetch: () => void,
  currentUser: User | null
) {
  const enabledRef = React.useRef(false);

  useFocusEffect(
    React.useCallback(() => {
      if (currentUser) {
        if (enabledRef.current) {
          refetch();
        } else {
          enabledRef.current = true;
        }
      }
    }, [refetch, currentUser])
  );
}
