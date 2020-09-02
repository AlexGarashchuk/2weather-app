import React, { useEffect } from "react";
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

export default function WeatherData({ weatherData, isLoaded }) {
  // console.log(weatherData);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [tabs, setTabs] = React.useState([]);
  const [date, setDate] = React.useState([]);

  function getTabs() {
    weatherData.map((item) => {
      setTabs([...tabs, item.name]);
    });
  }

  function removedItem() {
    const temp = [...tabs];
    temp.splice(0, 1);
    setTabs(temp);
  }

  useEffect(() => {
    getTabs();
  }, [weatherData]);

  useEffect(() => {
    if (tabs.length >= 5) {
      removedItem();
    }
  }, [tabs]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          {!isLoaded && tabs.map((tab) => <Tab key={tab} label={tab} />)}
        </Tabs>
        {!isLoaded &&
          weatherData.map((item, index) => (
            <div
              role="tabpanel"
              hidden={value !== index}
              id={`simple-tabpanel-${item.name}`}
              aria-labelledby={`simple-tab-${item.name}`}
              key={index}
            >
              {console.log(index)}
              {value === index && (
                <Box p={3}>
                  <div className="weather-icon">
                    <img
                      style={{ width: "100px" }}
                      src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                    />
                  </div>
                  <Typography>{item.name}</Typography>
                  <Typography>{item.weather[0].main}</Typography>
                  <Typography>{Math.round(item.main.temp)} &#176;С</Typography>
                  <Typography>
                    Feels like{Math.round(item.main.feels_like)} &#176;С
                  </Typography>

                  <Typography>{date}</Typography>
                  {/* will be update */}
                  {/* <Typography>Sunrise {item.sys.sunrise}</Typography>
                  <Typography>Sunset {item.sys.sunset}</Typography> */}
                </Box>
              )}
            </div>
          ))}
      </AppBar>
    </div>
  );
}
