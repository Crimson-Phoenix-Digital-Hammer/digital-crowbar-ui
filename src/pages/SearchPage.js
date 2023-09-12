import React from 'react';
import './SearchPage.css';
import { useStateValue } from '../components/StateProvider';
import useGoogleSearch from '../components/services/useGoogleSearch';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/images/dc-logo.png'
import { styled } from '@mui/material/styles';
import { Container, Divider, Grid, Paper } from '@mui/material'
import { ModeCommentOutlined, NotesOutlined, PhotoOutlined, BarChartOutlined, SettingsOutlined, HelpCenterOutlined, LogoutOutlined } from '@mui/icons-material'

function SearchPage() {
    const [{ term }, dispatch] = useStateValue();
  
    const { data } = useGoogleSearch(term);
  
    console.log(data);
  
    return (
      <Grid container spacing={2}>
      <Grid item md={3} xs={12}>
        <div className='main-menu'>
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <nav>
            <ul>
              <li>
                <NavLink to="/"><ModeCommentOutlined fontSize='large' /><span>AI Obfuscation Helper</span></NavLink>
              </li>
              <li>
                <NavLink to="/text-search"><NotesOutlined fontSize='large' /><span>Text Search</span></NavLink>
              </li>
              <li>
                <NavLink to="/image-search"><PhotoOutlined fontSize='large' /><span>Image Search</span></NavLink>
              </li>
              <li>
                <NavLink to="/stats"><BarChartOutlined fontSize='large' /><span>Statistics</span></NavLink>
              </li>
              <li>
                <NavLink to="/settings"><SettingsOutlined fontSize='large' /><span>Settings</span></NavLink>
              </li>
              <li>
                <NavLink to="/updates-and-faq"><HelpCenterOutlined fontSize='large' /><span>Updates & FAQ</span></NavLink>
              </li>
            </ul>
          </nav>
          <footer className='sidebar-footer'>
            <Divider light={true} />
            <Link to="/log-out"><span>Log Out</span><LogoutOutlined fontSize='large' /></Link>
          </footer>
        </div>
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