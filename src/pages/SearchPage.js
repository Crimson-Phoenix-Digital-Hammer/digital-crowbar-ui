import React from 'react';
import './SearchPage.css';
import { useStateValue } from '../components/StateProvider';
import useGoogleSearch from '../components/services/useGoogleSearch';
import { Grid } from '@mui/material'
import MainNav from '../components/MainNav';

function SearchPage({searchTerm}) {
    const [{ term }, dispatch] = useStateValue();
  
    const { data } = useGoogleSearch(term);
  
    console.log(data);
  
    return (
      <Grid container spacing={2}>
      <Grid item md={3} xs={12}>
        <MainNav />
      </Grid>
      <Grid item md={9} xs={12}>
        <div className='main-content'>
          <div className="searchPage">
            {term && (
              <div className="searchPage__results">
                <p className="searchPage__resultCount">
                  About {data?.searchInformation.formattedTotalResults} results (
                  {data?.searchInformation.formattedSearchTime} seconds) for{" "}
                  <strong>{term}</strong>
                </p>

                {data?.items.map((item, i) => (
                  <div key={i} className="searchPage__result">
                    <a className="searchPage__resultLink" href={item.link}>
                      {item.pagemap?.cse_image?.length > 0 &&
                        item.pagemap?.cse_image[0]?.src && (
                          <img
                            className="searchPage__resultImage"
                            src={
                              item.pagemap?.cse_image?.length > 0 &&
                              item.pagemap?.cse_image[0]?.src
                            }
                            alt=""
                          />
                        )}
                      {item.displayLink} ▾
                    </a>
                    <a className="searchPage__resultTitle" href={item.link}>
                      <h2>{item.title}</h2>
                    </a>

                    <p className="searchPage__resultSnippet">{item.snippet}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Grid>
      {/* <Grid item md={2} xs={12}>
        <div className='chat-history'>
          <QueryHistory />
        </div>
      </Grid> */}
    </Grid>
    );
  }

export default SearchPage;