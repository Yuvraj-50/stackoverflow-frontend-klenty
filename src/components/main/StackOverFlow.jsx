import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import AllQuestions from "./AllQuestions";
import { useNavigate, useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";

import { topleftalert } from "../../utils/alert";

const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

function StackOverFlow() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  const [allQuestion, setAllQuestion] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  async function fetchAllQuestion() {
    try {
      setloading(true);
      const token = Cookies.get("token");
      const response = await fetch(`${BASE_API_URL}/question`, {
        method: "GET",
        headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setloading(false);
        const data = await response.json();
        setAllQuestion(data.allQuestionData);
      }
    } catch (error) {
      setloading(false);
      topleftalert({ message: "something went wrong", icon: "error" });
    }
  }

  async function getSearchQuestion() {
    const token = Cookies.get("token");
    const response = await fetch(
      `${BASE_API_URL}/search/${searchParams.get("search")}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      setAllQuestion(data.data);
    }
  }

  useEffect(() => {
    fetchAllQuestion();
  }, []);

  useEffect(() => {
    const searchValue = searchParams.get("search");
    if (!searchValue) {
      fetchAllQuestion();
    } else {
      getSearchQuestion();
    }
  }, [searchParams]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function goToAskQuestion() {
    navigate("/askquestion");
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 10 }}>
      <Box sx={{ borderBottom: "1px solid black", paddingBottom: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" component={"div"}>
            All Questions
          </Typography>
          <Button variant="contained" onClick={goToAskQuestion}>
            ask Question
          </Button>
        </Box>

        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="p" component={"div"}>
            {allQuestion.length ? allQuestion.length : "0"} Questions
          </Typography>

          <Button variant="outlined" onClick={handleClick}>
            Sort by
          </Button>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleClose}>Recent first</MenuItem>
          </Menu>
        </Box>
      </Box>

      {allQuestion?.map((question) => (
        <AllQuestions key={question._id} question={question} />
      ))}
    </Container>
  );
}

export default StackOverFlow;
