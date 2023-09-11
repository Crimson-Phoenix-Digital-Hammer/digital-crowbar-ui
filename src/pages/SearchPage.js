import React from 'react';
import './SearchPage.css';
import { useStateValue } from '../components/StateProvider';
import useGoogleSearch from '../components/services/useGoogleSearch';
import { Link } from 'react-router-dom';
import Search from '../components/Search';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import logo from '../assets/images/digital-crowbar-logo-sm.png';

function SearchPage() {
    const [{ term }, dispatch] = useStateValue();
  
    const { data } = useGoogleSearch(term);
  
    console.log(data);
  
    return (
      <div className="searchPage">
        <div className="searchPage__header">
          <Link to="/">
            <img
              className="searchPage__logo"
              src={logo}
              alt=""
            />
          </Link>
  
          <div className="searchPage__headerBody">
            <Search hideButtons />
            <div className="searchPage__options">
              <div className="searchPage__optionsLeft">
                <div className="searchPage__option">
                  <DescriptionOutlinedIcon />
                  <Link to="/search">Obfuscate Search</Link>
                </div>
                <div className="searchPage__option">
                  <ImageOutlinedIcon />
                  <Link to="/image-search">Image Search</Link>
                </div>
                <div className="searchPage__option">
                  <HistoryOutlinedIcon />
                  <Link to="/recent-searches">Recent Searches</Link>
                </div>
              </div>
  
              <div className="searchPage__optionsRight">
                <div className="searchPage__option">
                  <Link to="/settings">Settings</Link>
                </div>
                <div className="searchPage__option">
                  <Link to="/tools">Tools</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
  
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
    );
  }

export default SearchPage;