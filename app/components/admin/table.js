import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  Tooltip,
  IconButton,
  TablePagination,
} from '@material-ui/core';
import { userRoleKeyVal } from 'helpers/user';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});
const rowsPerPageOptions = [5];
const SubTableHead = () => (
  <TableHead>
    <TableRow>
      <TableCell align="right" colSpan={1}></TableCell>
      <TableCell align="right" colSpan={1}>
        Prénom
      </TableCell>
      <TableCell align="right" colSpan={1}>
        Nom
      </TableCell>
      <TableCell align="right" colSpan={1}>
        Mail
      </TableCell>
      <TableCell align="right" colSpan={1}>
        Téléphone
      </TableCell>
      <TableCell align="right" colSpan={1}>
        Parrain
      </TableCell>
      <TableCell align="right" colSpan={1}>
        Status
      </TableCell>
      <TableCell align="right" colSpan={1}>
        Origin
      </TableCell>
    </TableRow>
  </TableHead>
);
const Body = ({ row = {}, handleDelte }) => (
  <TableRow hover>
    <TableCell padding="checkbox">
      <IconButton aria-label="delete" onClick={handleDelte(row)}>
        <DeleteIcon />
      </IconButton>
    </TableCell>
    <TableCell align="right">{row.firstName}</TableCell>
    <TableCell align="right">{row.lastName}</TableCell>
    <TableCell align="right">{row.email}</TableCell>
    <TableCell align="right">{row.phone}</TableCell>
    <TableCell align="right">{row.sponsorshipCode}</TableCell>
    <TableCell align="right">{userRoleKeyVal[row.role]}</TableCell>
    <TableCell align="right">{row.origin}</TableCell>
  </TableRow>
);
export default function SpanningTable({
  handleOpen,
  handlePaginateList,
  hasRowChecked = false,
  totalDocs,
  limit,
  docs,
  handleDelete,
  ...props
}) {
  const classes = useStyles();
  const handleChangePage = (e, newPage) => handlePaginateList(newPage + 1);
  const handleDelte = (row = {}) => () => {
    if (window.confirm(`Supprimer le compte de ${row?.firstName} ?`))
      handleDelete(row._id);
  };

  return (
    <div className="table-container">
      <TableContainer component={Paper}>
        <Tooltip
          title="Delete"
          style={{
            visibility: hasRowChecked ? 'visible' : 'hidden',
            position: 'absolute',
          }}
        >
          <IconButton
            aria-label="delete"
            onClick={hasRowChecked ? handleOpen : null}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Table className={classes.table} aria-label="spanning table">
          <SubTableHead />
          <TableBody>
            {docs?.map((row) => (
              <Body key={row._id} row={row} handleDelte={handleDelte} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={totalDocs}
        rowsPerPage={limit}
        page={props.page - 1}
        onChangePage={handleChangePage}
      />
      <style jsx>{`
        .table-container {
          width: 90vw;
          height: 95vh;
        }
        .table-container > div {
          height: 30px;
        }
        .arrows-container {
          margin-bottom: 5px;
        }
      `}</style>
    </div>
  );
}

SpanningTable.propTypes = {
  handleOpen: PropTypes.func,
  handlePaginateList: PropTypes.func.isRequired,
  hasRowChecked: PropTypes.bool,
  limit: PropTypes.number.isRequired,
  totalDocs: PropTypes.number.isRequired,
};
