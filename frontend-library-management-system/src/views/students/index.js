// material-ui
import { Typography } from '@mui/material';
import StudentsTable from './StudentTable';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const Students = () => (
    <MainCard title="Students">
        <Typography variant="body2">
        Welcome to the Students section of the Library Management System. This page is dedicated to all the students who are registered in the library.
        Our goal is to provide you with a seamless and efficient library experience. We understand that as a student, you have a busy schedule, and that's why we have extended hours for you to use the library.
        </Typography>
        <StudentsTable/>
    </MainCard>
);

export default Students;
