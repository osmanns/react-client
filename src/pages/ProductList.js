import React, { useState, useEffect } from 'react';
import Axios from "axios"
import Layout from "../components/layout/Layout"

import PropTypes from 'prop-types';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';


import style from "styled-components"
import "./style.css"

const Main = style.main`
    height: auto;
    padding: 0;
`;
const useStyles1 = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#3f51b5',
      color: theme.palette.common.white,
      fontSize: 16,
    },
    body: {
        fontSize: 14,
    }
  }))(TableCell);

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onChangePage(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onChangePage(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onChangePage(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
  
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };
  
  function createData(name, createdate, editdate, status, action) {
    return { name, createdate, editdate, status, action };
  }
  
  const rows = [
    createData('Cupcake', '12-02-2020', '15-02-2020', 'in-progress', 1),
    createData('Donut', '12-02-2020', '15-02-2020', 'in-progress', 1),
    createData('Eclair', '12-02-2020', '15-02-2020', 'in-progress', 1),
    createData('Frozen yoghurt', '12-02-2020', '15-02-2020', 'in-progress', 1),
    createData('Gingerbread', '12-02-2020', '15-02-2020', 'in-progress', 1),
    createData('Honeycomb', '12-02-2020', '15-02-2020', 'in-progress', 1),
    createData('Ice cream sandwich', '12-02-2020', '15-02-2020', 'in-progress', 1),
    createData('Jelly Bean', '12-02-2020', '15-02-2020', 'in-progress', 1),
    createData('KitKat', '12-02-2020', '15-02-2020', 'in-progress', 1),
    createData('Lollipop', '12-02-2020', '15-02-2020', 'in-progress', 1),
    createData('Marshmallow', '12-02-2020', '15-02-2020', 'in-progress', 1),
    createData('Nougat', '12-02-2020', '15-02-2020', 'in-progress', 1),
    createData('Oreo', '12-02-2020', '15-02-2020', 'in-progress', 1),
  ].sort((a, b) => (a.calories < b.calories ? -1 : 1));
  
  const useStyles2 = makeStyles({
    table: {
      minWidth: 500,
    },
  });

function ProductList() {
    // const { 
    //     TblContainer
    // } = useTable();

    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Layout className="productlist">
            <Main>
                <div className="contrainer">
                    <div className="product-title">
                        <div className="">รายการผลิตภัณฑ์</div>
                        <hr className="line" />
                    </div>

                    <div className="product-contrainer">
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="custom pagination table">
                            <TableHead>
                            <TableRow>
                                <StyledTableCell>ชื่อผลิตภัณฑ์</StyledTableCell>
                                <StyledTableCell align="right">วันที่เพิ่มข้อมูล</StyledTableCell>
                                <StyledTableCell align="right">วันที่แก้ไขข้อมูล</StyledTableCell>
                                <StyledTableCell align="right">สถานะ</StyledTableCell>
                                <StyledTableCell align="right">ดำเนินการ</StyledTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {(rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows
                            ).map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell style={{ width: 160 }} align="right">
                                        {row.createdate}
                                    </TableCell>
                                    <TableCell style={{ width: 160 }} align="right">
                                        {row.editdate}
                                    </TableCell>
                                    <TableCell style={{ width: 160 }} align="right">
                                        {row.status}
                                    </TableCell>
                                    <TableCell style={{ width: 250 }} align="right">
                                        {row.action}
                                    </TableCell>
                                </TableRow>
                            ))}

                            {emptyRows > 0 && (
                                <TableRow style={{ height: 52 * emptyRows }}>
                                    <TableCell colSpan={5} />
                                </TableRow>
                            )}
                            </TableBody>
                            <TableFooter>
                            <TableRow>
                                <TablePagination
                                rowsPerPageOptions={[5, 10, { label: 'All', value: -1 }]}
                                colSpan={6}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                            </TableFooter>
                        </Table>
                        </TableContainer>
                    </div>
                </div>
            </Main>
        </Layout>
    )
}

export default ProductList;