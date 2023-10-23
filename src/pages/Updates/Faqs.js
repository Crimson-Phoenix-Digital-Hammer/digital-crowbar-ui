import React from 'react';
import { styled } from '@mui/system';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MainNav from '../../components/MainNav';
import { FAQs } from '../../models/populate';

// Styled components
const StyledAccordion = styled(Accordion)`
  border: 1px solid rgba(0, 0, 0, 0.125);
  box-shadow: none;
  background-color: rgba(225, 225, 225, .5);

  &:hover {
    background-color: rgba(225, 225, 225, 0.25);
  }
`;

const HeaderTypography = styled(Typography)`
  font-weight: 600;
`;

const AnswerTypography = styled(Typography)`
  padding: 4px 16px;
`;

function Faqs() {
  return (
    <Grid container spacing={2}>
      <Grid item md={3} xs={12}>
        <MainNav />
      </Grid>
      <Grid item md={9} xs={12}>
        <div className='main-content'>
          <div className='faqs-header'>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className='faqs-body'>
            {FAQs.map((faq, i) => (
              <StyledAccordion key={i} disableGutters>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${i}-content`}
                  id={`panel${i}-header`}
                >
                  <HeaderTypography>{faq.question}</HeaderTypography>
                </AccordionSummary>
                <AccordionDetails style={{ backgroundColor: 'white' }}>
                  <AnswerTypography>
                    {faq.answer}
                  </AnswerTypography>
                </AccordionDetails>
              </StyledAccordion>
            ))}
          </div>
        </div>
      </Grid>
    </Grid>
  )
}

export default Faqs;
