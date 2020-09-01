import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { Link, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

export default function WeatherDetails({ currentCoord }) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .post(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${currentCoord.lat}&lon=${currentCoord.lon}&
        exclude={part}&units=metric&appid=6627805f240aca84b4a726d2429a3208`
      )
      .then((res) => {
        setData(res.data);
        setLoaded(true);
      });
  }, []);
 

  return (
    <div className={classes.root}>
      {loaded &&
        data.daily.map((item) => (
          <Box key={item.uvi}>
            <Paper elevation={0}>Clouds {item.clouds}</Paper>
            <Paper elevation={0}>Temp day {Math.round(item.temp.day)}</Paper>
            <Paper elevation={0}>
              Temp night {Math.round(item.temp.night)}
            </Paper>
          </Box>
        ))}
    </div>
  );
}
