import { useState, useEffect } from "react";
import API_KEY from "./keys/keys";

const CONTEXT_KEY = "d632282bd2b2e0710";

const useGoogleSearch = (term) => {
  const [data, setData] = useState(null);
  const [reqCount, setReqCount] = useState(0);
  
  useEffect(() => {
    const fetchData = async () => {
      fetch(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${term}`
      )
        .then((response) => {
          if(response.status === 200) {
            setReqCount(1);
            localStorage.setItem('GoogleSearches', [reqCount]);
          }
          if (!response.ok) {
            throw new Error('Failed to fetch');
          }
        })
        .then((response) => response.json())
        .then((result) => {
          setData(result);
        });
    };

    fetchData();
  }, [term]);

  return { data };
};
export default useGoogleSearch;