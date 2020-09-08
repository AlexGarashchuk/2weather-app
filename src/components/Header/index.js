import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    display: "block",
    fontSize: 14,
    color: "white",
  },
  link: {
    padding: "0 10px",
    color: "white",
    cursor: "pointer",
  },
});
export function Header({ isLoaded }) {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4">Weather App</Typography>
          <Typography variant="h6">
            <Link className={classes.link} to="/">
              Home Page
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
