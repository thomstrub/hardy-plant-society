import React, {useState, useEffect} from 'react'
import { Search, Grid, Header, Segment, Label, Image } from 'semantic-ui-react'



const initialState = {
  loading: false,
  results: [],
  value: '',
  searchTag: ''
}

function exampleReducer(state, action) {
  switch (action.type) {
    case 'CLEAN_QUERY':
      return initialState
    case 'START_SEARCH':
      return { ...state, loading: true, value: action.query, searchTag: action.query }
    case 'FINISH_SEARCH':
      return { ...state, loading: false, results: action.results }
    case 'UPDATE_SELECTION':
      return { ...state, value: action.selection }

    default:
      throw new Error()
  }
}

const resultRenderer = ({ common_name, image_url }) => <><Label content={common_name} /><Image src={image_url}/></>

function SearchExampleStandardCustom() {
  const [state, dispatch] = React.useReducer(exampleReducer, initialState)
  const { loading, results, value, searchTag } = state

  const timeoutRef = React.useRef()
  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current)
    dispatch({ type: 'START_SEARCH', query: data.value })

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' })
        return
      }

      dispatch({
        type: 'FINISH_SEARCH',
        results: trefleData,
      })
    }, 300)
  }, [])
  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])

   // Trefle API variables
   const KEY = process.env.TREFLETOKEN;
   const TREFLE_BASE_URL = `https://trefle.io/api/v1/plants/search?token=nGl9aJhLyHSPDXgy_7THrf3UycmVNDpcU4kvluaWwZQ&q=`;
 
   // Trefle API data
   const [trefleData, setTrefleData] = useState("");
 
   // Trefle API Call
   useEffect(() => {
     const proxyurl = "https://cors-anywhere.herokuapp.com/";
     console.log(searchTag, "useEffect searchTag");
     const trefleUrl = `${TREFLE_BASE_URL}${searchTag}`;
     fetch(proxyurl + trefleUrl)
       .then((res) => res.json())
       .then((data) => {
         console.log(data.data, "json data");
         setTrefleData(data.data);
       });
   }, [searchTag]);

  return (
    <Grid>
      <Grid.Column width={6}>
        <Search
          loading={loading}
          onResultSelect={(e, data) =>
            dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title })
          }
          onSearchChange={handleSearchChange}
          resultRenderer={resultRenderer}
          results={trefleData}
          value={value}
        />
      </Grid.Column>

      <Grid.Column width={10}>
        <Segment>
          <Header>State</Header>
          <pre style={{ overflowX: 'auto' }}>
            {JSON.stringify({ loading, results, value }, null, 2)}
          </pre>
          <Header>Options</Header>
          <pre style={{ overflowX: 'auto' }}>
            {JSON.stringify(trefleData, null, 2)}
          </pre>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

export default SearchExampleStandardCustom