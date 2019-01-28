import { suggest } from "@esri/arcgis-rest-geocoder";
import debounce from "lodash.debounce";
import { useEffect, useState } from "react";

function Geocode({ address, children }) {
  const [state, setState] = useState({
    data: undefined,
    loading: false,
    error: false
  });

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
        setState({
          ...state,
          data: res.suggestions,
          loading: false,
          error: false
        });
      })
      .catch(e => {
        setState({ ...state, data: undefined, error: e.message });
        console.error(e);
      });
  });

  const fetchData = () => {
    setState({ ...state, loading: true, error: false });
    makeNetworkRequest();
  };

  const { data, loading, error } = state;
  return children({
    data,
    loading,
    error,
    refetch: fetchData
  });
}

export default Geocode;
