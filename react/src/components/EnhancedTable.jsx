import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import {Box, Grid, Checkbox, TextField, Button, IconButton, Tooltip, FormControlLabel, Switch, Table, TableBody, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Typography, Paper, InputBase} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import FlexBetween from './FlexBetween';


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function filter(data, filters) {
  return data.filter(item => {
    return Object.entries(filters).every(([key, value]) => {
        return item[key].toLowerCase().includes(value.toLowerCase());
    });
  });
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.light,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <StyledTableRow>
        <StyledTableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </StyledTableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={'right'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { title, selected, setSelected, handleDataDelete, filters, onRequestFilter } = props;
  const [filtersFields, setFiltersFields] = React.useState(filters);
  const [isFiltersOpen, setIsFiltersOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDelete = (event, selected) => {
    selected.forEach(el => {
      handleDataDelete(el);
    })
    setSelected([]);
  }
  
  const handleInfo = (event, selected) => {
    selected.forEach(id => {
      navigate(`/adminpanel/${title.toLowerCase()}/${id}`);
    })
  }

  const handleInputChange = ({name, value}) => {
    setFiltersFields({
        ...filtersFields,
        [name]: value,
    });
  } 

  const handleApplyFilters = () => {
    onRequestFilter(filtersFields);
  }

  const handleRemoveFilters = () => {
    let resetFilters = {};
    Object.entries(filtersFields).forEach(([key, value]) => {
      resetFilters[key] = ''; 
    })
    setFiltersFields(resetFilters);
    onRequestFilter(resetFilters);
  }

  return (
    <Toolbar
      sx={{
        display: 'grid',
        gap: "1rem",
        pt: {sm: 1},
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selected.length > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      <FlexBetween>
        {selected.length > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {selected.length} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {title}
          </Typography>
        )}

        {selected.length === 0 ? (
          <Tooltip title="Filter list">
            <IconButton onClick={() => setIsFiltersOpen(!isFiltersOpen)}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        ) : selected.length === 1 ? (
          <FlexBetween gap="0.5rem">
            <Tooltip title="Show">
              <IconButton onClick={(event) => handleInfo(event, selected)}>
                <InfoIcon color='info'/>
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={(event) => handleDelete(event, selected)}>
                <DeleteIcon color='error'/>
              </IconButton>
            </Tooltip>
          </FlexBetween>
        ) : (
          <Tooltip title="Delete">
            <IconButton onClick={(event) => handleDelete(event, selected)}>
              <DeleteIcon color='error'/>
            </IconButton>
          </Tooltip>
        )}
      </FlexBetween>

      {isFiltersOpen &&
      <Box display="grid" gap="1rem" pb="1rem">
        <Grid container spacing={2} alignItems="center">
          {Object.entries(filtersFields).map(([key, value]) => {
            return (
              <Grid item key={key}>
              <TextField
                  label={key}
                  name={key}
                  variant="outlined"
                  value={value}
                  onChange={(e) => handleInputChange(e.target)}
              />
              </Grid>
            )
          })}
        </Grid>
        <Grid item gap="0.5rem" display="flex">
          <Button variant="outlined" color="primary" onClick={handleApplyFilters}>
              Apply Filters
          </Button>
          <Button variant="outlined" color="error" onClick={handleRemoveFilters}>
              Cancel
          </Button>
        </Grid>
      </Box>
      }
      
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default function EnhancedTable({rows, data, handleDataDelete}) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filters, setFilters] = React.useState(data.filters);

  const handleRequestFilter = (filters) => {
    setFilters(filters);
  }
  
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(filter(rows, filters), getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, rows.length, filters],
  );

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar 
          title={data.title} 
          numSelected={selected.length} 
          selected={selected} 
          setSelected={setSelected} 
          handleDataDelete={handleDataDelete} 
          filters={filters}
          onRequestFilter={handleRequestFilter}
        />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={data.headCells}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <StyledTableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <StyledTableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </StyledTableCell>
                    <StyledTableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        align='right'
                        padding="none"
                      >
                        {row.id}
                    </StyledTableCell>
                    {data.headCells.slice(1,).map((column) => {
                      let value = [];
                      column.mapping.map(field => value.push(row[field]))
                      return (
                        <StyledTableCell key={column.id} align="right">{value.join(' ')}</StyledTableCell>
                      )
                    })}
                  </StyledTableRow>
                );
              })}
              {emptyRows > 0 && (
                <StyledTableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <StyledTableCell colSpan={6} />
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel sx={{pl: "0.75rem"}}
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
