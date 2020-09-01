import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function WeatherData({ weatherData }) {
  const classes = useStyles();
  const [value, setValue] = React.useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
  
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
        >
          {weatherData.map((item) => (
            <Tab key={item.name} value={item.name} label={item.name} wrapped />
          ))}
        </Tabs>
      </AppBar>

      {weatherData
        .filter((name) => name.name === value)
        .map((data) => (
          <Box p={3} key={data.name} hidden={!data.name === value}>
            <div className="weather-icon">
              <img
                style={{ width: "100px" }}
                src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
              />
            </div>
            <Typography>{Math.round(data.main.temp)} &#176;С</Typography>
            <Typography>Feels like: {data.main.feels_like}</Typography>
            <Typography>{data.name}</Typography>
          </Box>
        ))}
    </div>
  );
}
