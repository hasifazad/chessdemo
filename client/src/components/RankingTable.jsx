import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

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

export default function RankingTable() {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    let [rankList, setRankList] = useState([])
    useEffect(() => {
        axios.get(`${BASE_URL}/api/ranking/get-ranklist`).then((response) => {
            console.log(response.data);
            setRankList(response.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])



    return (

        <TableContainer component={Paper} sx={{ width: '80%', margin: '20px auto', maxHeight: '85vh' }}>
            <Table sx={{ minWidth: 700 }} stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align='center'>Rank</StyledTableCell>
                        <StyledTableCell align='center'>Username</StyledTableCell>
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
                    {rankList.map((row, index) => (
                        <StyledTableRow key={index + 1}>
                            <StyledTableCell align='center' component="th" scope="row">
                                {index + 1}
                            </StyledTableCell>
                            <StyledTableCell align='center'>{row.user?.username}</StyledTableCell>
                            <StyledTableCell align='center'>{row.user_id}</StyledTableCell>
                            <StyledTableCell align='center'>{row.user?.email}</StyledTableCell>
                            <StyledTableCell align="right">{row.ranking.win + row.ranking.lose + row.ranking.draw}</StyledTableCell>
                            <StyledTableCell align="right">{row.ranking.win}</StyledTableCell>
                            <StyledTableCell align="right">{row.ranking.lose}</StyledTableCell>
                            <StyledTableCell align="right">{row.ranking.draw}</StyledTableCell>
                            <StyledTableCell align="right">{row.ranking.point}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    );
}