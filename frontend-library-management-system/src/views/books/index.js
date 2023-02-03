// material-ui
import { Typography } from '@mui/material';
import BooksTable from './BookTable';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const Books = () => (
    <MainCard title="Books">
        <Typography variant="body2">
        Welcome to the Books section of the Library Management System. This page is dedicated to all the book lovers. Our goal is to provide you with a vast collection of books to choose from and an efficient way to access them. We understand that as a student, you have a busy schedule, and that's why we have made it easy for you to find and borrow the books you need. 
        Browse through our collection and enjoy the convenience of borrowing books from the library.
        </Typography>
        <BooksTable/>
    </MainCard>
);

export default Books;
