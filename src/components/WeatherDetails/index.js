import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import axios from "axios";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  media: {
    height: 140,
  },
});

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
    <Card className={classes.root}>
      {loaded &&
        data.daily.map((item, index) => (
          <CardActionArea key={index}>
            <img
              style={{ width: "100px" }}
              src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {new Date(item.dt * 1000).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Clouds {item.clouds}
              </Typography>

              <Typography variant="body2" color="textSecondary" component="p">
                Temp day {Math.round(item.temp.day)}  &#176;С
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Temp night {Math.round(item.temp.night)}  &#176;С
              </Typography>
            </CardContent>
          </CardActionArea>
        ))}
    </Card>
  );
}
