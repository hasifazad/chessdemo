import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData(1, 159, 'afdsaf@gamil.com', 24, 4.0),
    createData(2, 237, 'mjffgf@gamil.com', 37, 4.3),
    createData(3, 262, 'yuiyifreytraf@gamil.com', 24, 6.0),
    createData(4, 305, 'afnmb@gamil.com', 67, 4.3),
    createData(5, 356, 'qwew@gamil.com', 49, 3.9),
    createData(5, 356, 'qwew@gamil.com', 49, 3.9),
    createData(5, 356, 'qwew@gamil.com', 49, 3.9),
    createData(5, 356, 'qwew@gamil.com', 49, 3.9),
    createData(5, 356, 'qwew@gamil.com', 49, 3.9),
    createData(5, 356, 'qwew@gamil.com', 49, 3.9),
    createData(5, 356, 'qwew@gamil.com', 49, 3.9),
    createData(5, 356, 'qwew@gamil.com', 49, 3.9),
    createData(5, 356, 'qwew@gamil.com', 49, 3.9),
    createData(5, 356, 'qwew@gamil.com', 49, 3.9),
    createData(5, 356, 'qwew@gamil.com', 49, 3.9),
    createData(5, 356, 'qwew@gamil.com', 49, 3.9),
    createData(5, 356, 'qwew@gamil.com', 49, 3.9),
    createData(5, 356, 'qwew@gamil.com', 49, 3.9),
    createData(5, 356, 'qwew@gamil.com', 49, 3.9),
    createData(5, 356, 'qwew@gamil.com', 49, 3.9),
    createData(5, 356, 'qwew@gamil.com', 49, 3.9),
    createData(5, 356, 'qwew@gamil.com', 49, 3.9),
    createData(5, 356, 'qwew@gamil.com', 49, 3.9),
    createData(5, 356, 'qwew@gamil.com', 49, 3.9),
    createData(5, 356, 'qwew@gamil.com', 49, 3.9),
    createData(5, 356, 'qwew@gamil.com', 49, 3.9),
    createData(5, 356, 'qwew@gamil.com', 49, 3.9),
    createData(5, 356, 'qwew@gamil.com', 49, 3.9),
    createData(5, 356, 'qwew@gamil.com', 49, 3.9),
    createData(5, 356, 'qwew@gamil.com', 49, 3.9),
    createData(5, 356, 'qwew@gamil.com', 49, 3.9),
    createData(5, 356, 'qwew@gamil.com', 49, 3.9),
];

export default function RankingTable() {
    return (

        <TableContainer component={Paper} sx={{ width: '80%', margin: '20px auto', maxHeight: '85vh' }}>
            <Table sx={{ minWidth: 700 }} stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align='center'>Rank</StyledTableCell>
                        <StyledTableCell align='center'>Chess ID</StyledTableCell>
                        <StyledTableCell align='center'>Email</StyledTableCell>
                        <StyledTableCell align="right">Total Matches</StyledTableCell>
                        <StyledTableCell align="right">Wins</StyledTableCell>
                        <StyledTableCell align="right">Loses</StyledTableCell>
                        <StyledTableCell align="right">Draws</StyledTableCell>
                        <StyledTableCell align="right">Points</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell align='center' component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align='center'>{row.calories}</StyledTableCell>
                            <StyledTableCell align='center'>{row.fat}</StyledTableCell>
                            <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                            <StyledTableCell align="right">{row.protein}</StyledTableCell>
                            <StyledTableCell align="right">{row.protein}</StyledTableCell>
                            <StyledTableCell align="right">{row.protein}</StyledTableCell>
                            <StyledTableCell align="right">{row.protein}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    );
}