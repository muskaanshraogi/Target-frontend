import React, { useEffect } from "react";
import {
  makeStyles,
  Button,
  Select,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { useLocation, useHistory } from 'react-router'
import Axios from "axios";
import Routes from './Routes'
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "0%",
  },
  tab: {
    padding: "0 2%",
    margin: 0,
    position: "relative",
    width: "100%",
  },
  buttonDg: {
    backgroundColor: "#193B55",
    color: "#ffffff",
    margin: "1% 2% 0 0",
  },
  button: {
    margin: "1% 2% 0 0",
  },
  backDrop: {
    backdropFilter: "blur(3px)",
    backgroundColor: "rgba(69,69,69,0.9)",
  },
}));

export default function Admin() {

  const classes = useStyles();

  const location = useLocation()
  const history = useHistory()

  const { enqueueSnackbar } = useSnackbar();

  const [year, setYear] = React.useState([]);
  const [acadYear, setAcadYear] = React.useState("");
  const [clearYear, setClearYear] = React.useState(false);
  const [resetDb, setResetDb] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);

  const handleSelect = (e) => {
    setAcadYear(e.target.value);
  };

  const handleStaff = () => {
    history.push('/home/admin/staff')
  }

  const handleSubjects = () => {
    history.push('/home/admin/subjects')
  }

  const handleClose = () => {
    setResetDb(false);
    setClearYear(false);
  };

  const handleDelete = () => {
    if (clearYear) {
      Axios.delete(
        `${process.env.REACT_APP_HOST}/api/final/clear/${acadYear}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("usertoken")}`,
          },
        }
      )
        .then((res) => {
          enqueueSnackbar(`Delete successful`, { variant: "success" });
        })
        .catch((error) => {
          enqueueSnackbar("Could not delete data", { variant: "error" });
        });
    } else if (resetDb) {
      Axios.delete(`${process.env.REACT_APP_HOST}/api/final/reset`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("usertoken")}`,
        },
      })
        .then((res) => {
          enqueueSnackbar(`Database reset`, { variant: "success" });
          setRedirect(true);
        })
        .catch((error) => {
          enqueueSnackbar("Could not reset database", { variant: "error" });
        });
    }

    handleClose();
  };

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_HOST}/api/final/acadYear`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("usertoken")}`,
      },
    }).then((res) => {
      setYear(res.data.data);
    });
  }, []);

  return (
    <div className={classes.root}>
      {redirect ? <Redirect to="/" /> : null}
      {
        location.pathname.includes("subjects") ?
          <Button 
           color='secondary'
           variant='outlined'
           className={classes.button}
           onClick={handleStaff}>
            View Staff
          </Button> :
          <Button
           color='secondary'
           variant='outlined'
           className={classes.button}
           onClick={handleSubjects}>
            View Subjects
          </Button>
      }
      <div
        style={{
          float: "right",
          display: "inline-flex block",
          width: "36%",
          marginBottom: "1%",
        }}
      >
        <Select
          variant="outlined"
          style={{ width: "22%" }}
          className={classes.button}
          value={acadYear}
          onChange={handleSelect}
        >
          <option aria-label="None" value="" />
          {year.map((y) => (
            <option value={y.acadYear} style={{ padding: "3px" }}>
              {y.acadYear}
            </option>
          ))}
        </Select>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => {
            setClearYear(true);
          }}
        >
          Clear Academic Year
        </Button>
        <Button
          className={classes.buttonDg}
          variant="contained"
          color='secondary'
          onClick={() => {
            setResetDb(true);
          }}
        >
          Reset Database
        </Button>
      </div>
      <Routes />
      <Dialog
        open={resetDb || clearYear}
        onClose={handleClose}
        BackdropProps={{
          classes: {
            root: classes.backDrop,
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {clearYear ? (
              <p>
                Are you sure you want to delete all data for the academic year{" "}
                <b>{acadYear}</b>?
              </p>
            ) : null}
            {resetDb ? (
              <p>
                Are you sure you want to reset the database? It will permanently
                delete all your staff and subject records.
              </p>
            ) : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="primary"
            style={{ paddingTop: "8px" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="primary"
            style={{ backgroundColor: "#f50057", color: "#ffffff" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
