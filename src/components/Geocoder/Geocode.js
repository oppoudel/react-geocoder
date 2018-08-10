import React from "react";
import debounce from "lodash.debounce";
import isEqual from "react-fast-compare";
import { suggest } from "@esri/arcgis-rest-geocoder";

class Geocode extends React.Component {
  state = {
    data: undefined,
    loading: false,
    error: false
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate({ children: _, ...prevProps }) {
    const { children, ...props } = this.props;
    if (!isEqual(prevProps, props)) {
      this.fetchData();
    }
  }

  makeNetworkRequest = debounce(() => {
    const { address } = this.props;
    suggest(address, {
      params: { location: [-76.6162, 39.3043], maxSuggestions: 10 }
    })
      .then(res => {
        this.setState({
          data: res.suggestions,
          loading: false,
          error: false
        });
      })
      .catch(e => {
        this.setState({ data: undefined, error: e.message, loading: false });
        console.error(e);
      });
  });

  fetchData = () => {
    this.setState({ error: false, loading: true });
    this.makeNetworkRequest();
  };

  render() {
    const { children } = this.props;
    const { data, loading, error } = this.state;

    return children({
      data,
      loading,
      error,
      refetch: this.fetchData
    });
  }
}

export default Geocode;
