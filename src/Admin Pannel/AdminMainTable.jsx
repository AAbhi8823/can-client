import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import fileUpload from "../Photos/fileUpload.svg";
import { useState, useEffect } from "react";
import { AdminToken } from "./AdminToken";
import axios from "axios";
import { adminbaseurl } from "./AdminToken";

export default function BasicTable() {
  const [ticketLists, setTicketList] = useState([]);

  const ticketList = async () => {
    const info = {
      headers: {
        Authorization: `Bearer ${AdminToken}`,
      },
    };
    try {
      const response = await axios.get(
        `${adminbaseurl}/ticket/get-ticket-list`,
        info
      );
      console.log("setTicketList:::::>>>", response?.data?.data);
      setTicketList(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching ticket list:", error);
    }
  };

  useEffect(() => {
    ticketList();
  }, []);

  return (
    <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
      <Table sx={{ minWidth: 650, boxShadow: "none" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Ticket no.</TableCell>
            <TableCell align="center">Ticket Type</TableCell>
            <TableCell align="center">CAN Id</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Subject</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Files attached</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ticketLists.map((ticket, index) => (
            <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell style={{ fontWeight: "600" }} component="th" scope="row">
                {ticket.ticket_id}
              </TableCell>
              <TableCell align="center">{ticket.ticket_type}</TableCell>
              <TableCell align="center">{ticket.CANID}</TableCell>
              <TableCell align="center">{ticket.createdAt}</TableCell>
              <TableCell align="center">{ticket.ticket_subject}</TableCell>
              <TableCell align="center">{ticket.ticket_status}</TableCell>
              <TableCell align="center" className="flex justify-center">
                <div className="m-2 fileSection cursor-pointer">
                  <img src={fileUpload} alt="" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
