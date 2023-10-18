import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MainNav from '../../components/MainNav'
import { Grid } from '@mui/material'
import { FAQs } from '../../models/populate'

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
                            <Accordion key={i}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>{faq.question}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        {faq.answer}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}

export default Faqs