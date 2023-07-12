import {useState, useEffect} from 'react'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'

const useObfuscate = (term) => {
    const [data, SetData] = useState(null)
    // const [{}, dispatch] = useStateValue()
    useEffect(() => {
      const fetchData = async () => {
        fetch(
          'http://digital-crowbar-dev.eba-7szv7fvp.us-east-1.elasticbeanstalk.com/obfuscate_text_query', {
            method: 'POST',
            // credentials: 'include',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({query_text: term, number_of_suggestions: 5})
          }
        )
          .then((response) => response.json())
          .then((result) => {
            SetData(result);
          })
          .catch(error => {
            // Handle any errors that occurred during the request
            console.error(error);
          });
      };
  
      fetchData();
    }, [term]);

    // dispatch({
    //     type: actionTypes.SET_SEARCH_TERM,
    //     term: data,
    // })

  return { data }
}

export default useObfuscate;