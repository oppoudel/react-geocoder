import { useState, useEffect } from "react";
import debounce from "lodash.debounce";
import { suggest } from "@esri/arcgis-rest-geocoder";

function Geocode({ address, children }) {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(
    () => {
      fetchData();
    },
    [address]
  );

  const makeNetworkRequest = debounce(() => {
    suggest(address, {
      params: { location: [-76.6162, 39.3043], maxSuggestions: 10 }
    })
      .then(res => {
        setData(res.suggestions);
        setLoading(false);
        setError(false);
      })
      .catch(e => {
        setData(undefined);
        setError(e.message);
        setLoading(false);
        console.error(e);
      });
  });

  const fetchData = () => {
    setError(false);
    setLoading(true);
    makeNetworkRequest();
  };

  return children({
    data,
    loading,
    error,
    refetch: fetchData
  });
}

export default Geocode;
