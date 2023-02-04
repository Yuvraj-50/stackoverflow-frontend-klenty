import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Cookies from "js-cookie";
import { useNavigate, useSearchParams } from "react-router-dom";
import { topleftalert } from "../../utils/alert";
import { formatDate } from "../../utils/formatData";
import HtmlParser from "react-html-parser";

const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

function SingleQuestion() {
  const [comment, setComment] = useState("");

  const [answer, setAnswer] = useState("");

  const [loading, setLoading] = useState(false);

  const [questionData, setQuestionData] = useState();

  const [searchParams, setSearchParams] = useSearchParams();

  const params = searchParams.get("q");

  const navigate = useNavigate();

  function handleAnswerChange(value) {
    setAnswer(value);
  }

  async function handleCommentSubmit() {
    try {
      const token = Cookies.get("token");
      if (!comment) {
        topleftalert({ message: "cannot add empty comment", icon: "error" });
        return;
      }
      const response = await fetch(
        `${BASE_API_URL}/comment/${questionData._id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ comment }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        fetchAnswerDetails();
        setComment("");
        topleftalert({ message: "comment add successfully", icon: "success" });
      }
    } catch (error) {
      topleftalert({ message: "cannot add comment", icon: "error" });
      console.log(error);
    }
  }

  async function handleAnswerSubmit() {
    try {
      const token = Cookies.get("token");
      if (!answer) {
        topleftalert({ message: "cannot add empty answer", icon: "error" });
        return;
      }

      const response = await fetch(`${BASE_API_URL}/answer`, {
        method: "POSt",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          answer,
          question_id: questionData._id,
        }),
      });
      const data = await response.json();
      console.log(data);
      fetchAnswerDetails();
      setAnswer("");
      topleftalert({ message: "answer added successfylly", icon: "success" });
    } catch (error) {
      topleftalert({ message: "cannot add answer", icon: "error" });
    }
  }

  async function fetchAnswerDetails() {
    try {
      setLoading(true);
      const token = Cookies.get("token");
      const response = await fetch(`${BASE_API_URL}/question/${params}`, {
        method: "GET",
        headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setLoading(false);
        setQuestionData(data.data[0]);
      }
    } catch (error) {
      console.log(error);
      topleftalert({ message: "something went wrong", icon: "error" });
    }
  }

  useEffect(() => {
    fetchAnswerDetails();
  }, []);

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
    <Container sx={{ mt: 10, mb: 10 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          borderBottom: "1px solid black",
          paddingBottom: 4,
        }}
      >
        <Typography flex={1} variant="h5" component={"div"}>
          {questionData?.title}
        </Typography>
        <Box>
          <Button
            flex={1}
            variant="contained"
            onClick={() => {
              navigate("/askquestion");
            }}
          >
            ask Question
          </Button>
        </Box>
      </Box>
      <Box mt={5}>
        <Box sx={{ overflow: "auto" }} mb={5}>
          <Typography>{HtmlParser(questionData?.body)}</Typography>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, color: "white" }}>
          {questionData?.tags?.map((tag) => (
            <Box
              sx={{
                cursor: "default",
                background: "#6096B4",
                padding: 1,
                maxWidth: "auto",
              }}
              key={tag}
            >
              {tag}
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "end",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Avatar />
            <Typography>{formatDate(questionData?.created_at)}</Typography>
          </Box>
          <Typography>{questionData?.user.name}</Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="h5">Comments</Typography>
        <Box>
          {questionData?.commentDetails?.map((comment) => (
            <Typography component={"div"} m={2} variant="p">
              {comment?.comment} {"  --  "}
              <span style={{ background: "lightblue", padding: 8 }}>
                created by {comment?.user?.name}
              </span>
            </Typography>
          ))}
        </Box>
        <Typography variant="h6">Add comment</Typography>
        <TextareaAutosize
          minRows={8}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "1rem",
            padding: "10px",
            fontSize: "1.2rem",
          }}
          placeholder="Write you comments here"
        />
        <Button onClick={handleCommentSubmit} variant="contained">
          Add comment
        </Button>
      </Box>

      <Box mt={4}>
        <Typography variant="h6">Number of answer</Typography>
        <Box marginLeft={4}>
          {questionData?.answerDetails?.map((answer) => (
            <>
              <Typography>{HtmlParser(answer?.answer)}</Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "end",
                }}
              >
                <Typography variant="h6">{answer.user.name}</Typography>
                <Typography>{formatDate(answer.created_at)}</Typography>
              </Box>
            </>
          ))}
        </Box>
      </Box>
      <Box mt={4}>
        <Typography variant="h6">Add Your answer</Typography>
        <ReactQuill
          value={answer}
          onChange={handleAnswerChange}
          className="react-quill"
          theme="snow"
        />
        <Button onClick={handleAnswerSubmit} variant="contained">
          Add Answer
        </Button>
      </Box>
    </Container>
  );
}

export default SingleQuestion;
