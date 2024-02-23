'use client';

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Breadcrumbs,
    Button,
    Link as LinkMUI,
    Paper,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography,
} from '@mui/material';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { EPath } from '~/common/enums';

const steps = [
    {
        label: 'Thong tin chung',
        description: ``,
    },
    {
        label: 'Mo ta',
        description: '',
    },
    {
        label: 'Cac lua chon',
        description: ``,
    },
];

function ProductAddPage() {
    const [activeStep, setActiveStep] = useState(0);
    const [expanded, setExpanded] = useState<string | false>('expanded-1');

    function handleNextStep(panel: string) {
        setActiveStep((prev) => prev + 1);
        setExpanded(panel);
    }
    function handleBackStep(panel: string) {
        setActiveStep((prev) => prev - 1);
        setExpanded(panel);
    }

    return (
        <Fragment>
            <Box p='18px 24px 12px' bgcolor='white'>
                <Breadcrumbs separator='>'>
                    <LinkMUI href={EPath.MANAGE_HOME} underline='hover' color='grey.400' component={Link}>
                        Trang chu
                    </LinkMUI>
                    <Typography color='text.primary' component='span'>
                        Tao san pham
                    </Typography>
                </Breadcrumbs>

                <Typography variant='h2' mt={2}>
                    Tao san pham
                </Typography>
            </Box>
            <Box display='flex' alignItems='flex-start' gap={4} mt={3} px={3}>
                <Box flex={1} component='form'>
                    <Accordion expanded={expanded === 'expanded-1'}>
                        <AccordionSummary>Thong tin chung</AccordionSummary>
                        <AccordionDetails>
                            <TextField id='name' label='' placeholder='Nhap ten san pham...' size='small' />
                            <Box display='flex' gap={3} justifyContent='flex-end'>
                                <Button variant='contained' onClick={() => handleNextStep('expanded-2')}>
                                    Hoan tat
                                </Button>
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'expanded-2'}>
                        <AccordionSummary>Mo ta san pham</AccordionSummary>
                        <AccordionDetails>
                            <TextField id='price' label='' placeholder='Nhap ten san pham...' size='small' />
                            <Box display='flex' gap={3} justifyContent='flex-end'>
                                <Button variant='contained' onClick={() => handleBackStep('expanded-1')}>
                                    Huy
                                </Button>
                                <Button variant='contained' onClick={() => handleNextStep('expanded-3')}>
                                    Hoan tat
                                </Button>
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'expanded-3'}>
                        <AccordionSummary>Cac lua chon</AccordionSummary>
                        <AccordionDetails>
                            <TextField id='options' label='' placeholder='Nhap ten san pham...' size='small' />
                            <Box display='flex' gap={3} justifyContent='flex-end'>
                                <Button variant='contained' onClick={() => handleBackStep('expanded-2')}>
                                    Huy
                                </Button>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Box>
                <Paper elevation={0} sx={{ width: '35.95%', p: 2 }}>
                    <Stepper activeStep={activeStep} orientation='vertical'>
                        {steps.map((step) => (
                            <Step key={step.label}>
                                <StepLabel>{step.label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Paper>
            </Box>
        </Fragment>
    );
}

export default ProductAddPage;
