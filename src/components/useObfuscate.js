import {useState, useEffect} from 'react'

const useObfuscate = (term) => {
    const [data, SetData] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        fetch(
          'http://digital-crowbar-dev.eba-7szv7fvp.us-east-1.elasticbeanstalk.com/obfuscate_text_query/', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
            "query_text": `${term}`,
            "number_of_suggestions": 5
            })
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

  return { data }
}

export default useObfuscate;