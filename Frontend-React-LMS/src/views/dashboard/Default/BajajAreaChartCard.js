import { useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Typography, Link } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';


// project imports
import chartData from './chart-data/bajaj-area-chart';

// ===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||=========================== //

const BajajAreaChartCard = (data) => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const { navType } = customization;

    const orangeDark = theme.palette.secondary[800];

    useEffect(() => {
        const newSupportChart = {
            ...chartData.options,
            colors: [orangeDark],
            tooltip: {
                theme: 'light'
            }
        };
        ApexCharts.exec(`support-chart`, 'updateOptions', newSupportChart);
    }, [navType, orangeDark]);

    
    const firstbook = data.data[Math.floor(Math.random() * 5)];
    let title = firstbook.title;
    let buy_links = firstbook.buy_links[0].url;
    let buy_name = firstbook.buy_links[0].name;
    let ranking = firstbook.rank;
    console.log(firstbook)
    console.log(buy_links)


    return (
        <Card sx={{ bgcolor: 'secondary.light' }}>
            <Grid container sx={{ p: 2, pb: 0, color: '#fff' }}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.dark }}>
                                {title.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}
                            </Typography>
                        </Grid>
                        <Grid item>
                        <Link rel="noopener noreferrer" href={buy_links} variant="body2" target="_blank">
                        <Typography variant="h4" sx={{ color: theme.palette.grey[800] }}>
                                {buy_name}
                            </Typography>
                        </Link>

                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.grey[800] }}>
                        {ranking}% Ranking
                    </Typography>
                </Grid>
            </Grid>
            <Chart {...chartData} />
        </Card>
    );
};

export default BajajAreaChartCard;
