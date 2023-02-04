import { Button, Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import truncate from "truncate";
import { formatDate } from "../../utils/formatData";

function AllQuestions({ question }) {
  const navigate = useNavigate();

  function goToSingleQuestion() {
    navigate(`/singlequestion?q=${question._id}`);
  }

  return (
    <Box sx={{ mt: 5 }}>
      <Card sx={{ overflow: "auto", mb: 1, p: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box flex={1}>
            <Typography>{question.answerDetails.length}</Typography>
            <Typography>Answers</Typography>
          </Box>
          <Box flex={2}>
            <Typography
              onClick={goToSingleQuestion}
              color={"blue"}
              sx={{ cursor: "pointer" }}
            >
              {question.title}
            </Typography>
            <Typography>
              {ReactHtmlParser(truncate(question.body, 150))}
            </Typography>
          </Box>
        </Box>

        <Box mt={3}>
          <Box
            sx={{ display: "flex", flexWrap: "wrap", gap: 1, color: "white" }}
          >
            {question?.tags?.map((tag) => (
              <Box
                sx={{ cursor: "default", background: "#6096B4", padding: 1 }}
                key={tag}
              >
                {tag}
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "end",
            }}
          >
            <Typography>Asked by {question.user.name}</Typography>
            <Typography>{formatDate(question.createdAt)}</Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

export default AllQuestions;
