// material-ui
import { Typography } from '@mui/material';
import RecordsTable from './RecordTable';
// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const Records = () => (
    <MainCard title="Records">
        <Typography variant="body2">
        This series provides a record of items on order. May contain brief catalog information. Once the item is received, 
        the acquisition record becomes a catalog record; however, if the item is not received, the record is purged. 
        </Typography>
        <RecordsTable/>
    </MainCard>
);

export default Records;
