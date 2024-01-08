import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

// CustomTabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired
// };

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`
    };
}

export default function BasicTabs({ onChildStateChange }) {
    const [value, setValue] = React.useState(0);
    // console.log(value)

    const handleChange = (event, newValue) => {
        setValue(newValue);
        onChildStateChange(newValue)
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                TabIndicatorProps={{ sx: { background: "#C31A7F" } }}
                sx={{
                    "& button.Mui-selected": { fontWeight: "700", color: "#000" }
                }}
            >
                <Tab label="My Story" {...a11yProps(0)} />
                <Tab label="Meeting" {...a11yProps(1)} />
                <Tab label="Saved" {...a11yProps(2)} />
                <Tab label="Health Card" {...a11yProps(3)} />
            </Tabs>
        </Box>
    );
}
