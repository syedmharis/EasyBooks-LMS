import PropTypes from 'prop-types';
import { useState,useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Typography } from '@mui/material';

// project imports
import BajajAreaChartCard from './BajajAreaChartCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';


// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //



const PopularCard = ({ isLoading }) => {
    const theme = useTheme();

    const [bookdata, setBookData] = useState([]);
      
    useEffect(() => {
        fetch("https://api.nytimes.com/svc/books/v3/lists/Business-Books.json?api-key=SzJd40V6zf6JmqMZiWTYHHQkEhKbmF3n")
        .then(response => response.json())
        .then(bookdata => setBookData(bookdata.results.books.slice(0,5)))
        .catch(error => console.log(error));
        }, []);
        
    if(bookdata.length === 0) return null;

    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container alignContent="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h4">Popular Business Books</Typography>


                                    </Grid>

                                </Grid>
                            </Grid>
                            <Grid item xs={12} sx={{ pt: '16px !important' }}>
                                <BajajAreaChartCard data = {bookdata}/>
                            </Grid>
                            
         
          {bookdata.map(book => (
            <Grid item xs={12}>
            <Grid container direction="column">
                                <Grid item>
                                    <Grid container alignItems="center" justifyContent="space-between">
                                        <Grid item>
                                            <Typography variant="subtitle1" color="inherit">
                                                {book.title.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Grid container alignItems="center" justifyContent="space-between">
                                                <Grid item>
                                                    <Typography variant="subtitle1" color="inherit">
                                                        {book.author.slice(0,11)}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Avatar
                                                        variant="rounded"
                                                        sx={{
                                                            width: 16,
                                                            height: 16,
                                                            borderRadius: '5px',
                                                            backgroundColor: theme.palette.success.light,
                                                            color: theme.palette.success.dark,
                                                            ml: 2
                                                        }}
                                                    >
                                                        <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                                                    </Avatar>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle2" sx={{ color: 'success.dark' }}>
                                       {book.rank}% Ranking
                                    </Typography>
                                </Grid>
            </Grid>
            <Divider sx={{ my: 1.5 }} />
            </Grid>
          ))}
                            
                        </Grid>
                    </CardContent>
                    <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
                        <Button size="small" disableElevation href="https://www.libertybooks.com/best-seller-books">
                            View All
                            <ChevronRightOutlinedIcon />
                        </Button>
                    </CardActions>
                </MainCard>
            )}
        </>
    );
};

PopularCard.propTypes = {
    isLoading: PropTypes.bool
};

export default PopularCard;
