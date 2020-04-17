import { suggest } from '@esri/arcgis-rest-geocoder';
import debounce from 'lodash.debounce';
import { useEffect, useState } from 'react';

function Geocode({ address, children }) {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = debounce(async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await suggest(address, {
          params: { location: [-76.6162, 39.3043], maxSuggestions: 5 },
        });
        setData(res.suggestions);
        setLoading(false);
      } catch (e) {
        setData(undefined);
        setLoading(false);
        setError(e.message);
        console.error(e);
      }
    });
    fetchData();
  }, [address]);

  return children({
    data,
    loading,
    error,
  });
}

export default Geocode;
