import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';


export default function useTable(records, headerCells) {
    const TblContainer = props => (
        <Table>

        </Table>
    )

    return {
        TblContainer
    }
}