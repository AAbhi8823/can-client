import * as React from "react";
import TextField from "@mui/material/TextField";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import fileUpload from "../Photos/fileUpload.svg";
import axios from "axios";
import { adminbaseurl, AdminToken } from "./AdminToken";

const AdminInput = (outerTheme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "--TextField-brandBorderColor": "#E0E3E7",
            "--TextField-brandBorderHoverColor": "#B2BAC2",
            "--TextField-brandBorderFocusedColor": "#6F7E8C",
            "& label.Mui-focused": {
              color: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "var(--TextField-brandBorderColor)",
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderHoverColor)",
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            "&:before, &:after": {
              borderBottom: "2px solid var(--TextField-brandBorderColor)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom:
                "2px solid var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            "&:before": {
              borderBottom: "2px solid var(--TextField-brandBorderColor)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom:
                "2px solid var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
    },
  });

export default function CustomizedInputsStyleOverrides() {
  const outerTheme = useTheme();
  const [ticketType, setTicketType] = React.useState("");
  const [priority, setPriority] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [canId, setCanId] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [fileError, setFileError] = React.useState("");
  const fileInputRef = React.useRef(null);

  const handleTicketTypeChange = (event) => {
    setTicketType(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.type;
      const fileSize = selectedFile.size;
      if (fileType !== "application/pdf" && fileType !== "image/png") {
        setFileError("Only PDF or PNG files are allowed.");
      } else if (fileSize > 1 * 1024 * 1024) {
        setFileError("File size should not exceed 1 MB.");
      } else {
        setFileError("");
        setFile(selectedFile);
      }
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("ticket_type", ticketType);
    formData.append("ticket_subject", subject);
    formData.append("ticket_description", description);
    formData.append("email", email);
    formData.append("CANID", canId);
    formData.append("ticket_priority", priority);
    formData.append("ticket_comments", "Raised Ticket comments ticket");
    if (file) {
      formData.append("file_attachement", file);
    }

    const config = {
      headers: {
        Authorization: `Bearer ${AdminToken}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.post(
        `${adminbaseurl}/ticket/add-ticket`,
        formData,
        config
      );
      console.log("Response", response.data);
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { sm: "1fr 1fr 1fr" },
        gap: 2,
      }}
    >
      <ThemeProvider theme={AdminInput(outerTheme)}>
        <FormControl variant="standard" sx={{ minWidth: 120 }}>
          <InputLabel>Select Ticket Type</InputLabel>
          <Select
            value={ticketType}
            onChange={handleTicketTypeChange}
            label="Select Ticket Type"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Refund request">Refund request</MenuItem>
            <MenuItem value="Order status">Order status</MenuItem>
            <MenuItem value="Payment issue">Payment issue</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Subject"
          variant="standard"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <TextField
          label="Description"
          variant="standard"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="CAN Id"
          variant="standard"
          value={canId}
          onChange={(e) => setCanId(e.target.value)}
        />
        <TextField
          label="Email"
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormControl variant="standard" sx={{ minWidth: 120 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={priority}
            onChange={handlePriorityChange}
            label="Priority"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Top">Top</MenuItem>
          </Select>
        </FormControl>
        <div className="flex">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            accept=".pdf,.png"
          />
          <button onClick={() => fileInputRef.current.click()}>
            <div className=" m-2 fileSection cursor-pointer ">
              <img src={fileUpload} alt="Upload" />
            </div>
          </button>
          <div className=" mt-2">
            <button className="Submit text-white" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          {fileError && <Typography color="error">{fileError}</Typography>}
        </div>
      </ThemeProvider>
    </Box>
  );
}
