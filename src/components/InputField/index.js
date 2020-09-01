import React, { useState, useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

import WeatherData from "../WeatherData";
import { Switch, Route, Router } from "react-router-dom";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: "100%",
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
);


export function InputField({value, onChange, getWeatherData, isLoaded, onChangeValue, setWeatherData, setListPlaces, setCurrentData, weatherData}) {

  const classes = useStyles();
  return (
    <div>
      <Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search weather details"
          inputProps={{ "aria-label": "search google maps" }}
          value={value}
          onChange={(e) => onChangeValue(e)}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
          onClick={(e) => getWeatherData(e)}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
}
