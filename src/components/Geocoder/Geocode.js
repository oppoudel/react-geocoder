import { suggest } from '@esri/arcgis-rest-geocoder';
import debounce from 'lodash.debounce';
import { useEffect, useReducer } from 'react';

const initialState = {
  data: undefined,
  loading: true,
  error: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        data: action.payload,
        loading: false,
        error: false,
      };
    case 'FETCH_ERROR':
      return {
        data: undefined,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

function Geocode({ address, children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const fetchData = debounce(async () => {
      try {
        const res = await suggest(address, {
          params: { location: [-76.6162, 39.3043], maxSuggestions: 5 },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: res.suggestions });
      } catch (e) {
        dispatch({ type: 'FETCH_ERROR', payload: e.message });

        console.error(e);
      }
    });
    fetchData();
  }, [address]);

  const { data, loading, error } = state;

  return children({
    data,
    loading,
    error,
  });
}

export default Geocode;
