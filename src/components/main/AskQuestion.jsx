import React, { useState } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { TagsInput } from "react-tag-input-component";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { topleftalert } from "../../utils/alert";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

const initialData = {
  title: "",
  body: "",
};

function AskQuestion() {
  const [formData, setFormData] = useState(initialData);
  const [selected, setSelected] = useState([]);
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  function handleBodyChange(value) {
    setFormData({ ...formData, body: value });
  }

  async function handleFormSubmit() {
    if (
      formData.title.length == 0 ||
      formData.title.body == 0 ||
      selected.length == 0
    ) {
      topleftalert({ message: "All fields are required", icon: "error" });
      return;
    }

    setloading(true);
    const token = Cookies.get("token");

    try {
      const response = await fetch(`${BASE_API_URL}/question`, {
        method: "POST",
        headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, tags: selected }),
      });

      if (response.ok) {
        setloading(false);
        topleftalert({ message: "question Added", icon: "success" });
        navigate("/");
      }
      console.log(formData);
    } catch (error) {
      setloading(false);
      topleftalert({ message: "error while added question", icon: "error" });
    }
  }

  return (
    <Container sx={{ mt: 10, mb: 10 }}>
      <Typography variant="h5" mb={5}>
        Ask a Public Question
      </Typography>

      <Paper component={"form"} sx={{ p: 4 }} elevation={3}>
        <Box>
          <Typography variant="h6">Title</Typography>
          <Typography variant="p" component={"div"}>
            Be specific and imagine you’re asking a question to another person.
          </Typography>
          <TextField
            value={formData.title}
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
            }}
            size="small"
            fullWidth
            id="outlined-basic"
            label="Enter title"
            variant="outlined"
            sx={{ mt: 2, mb: 2 }}
          />
        </Box>
        <Box mb={8}>
          <Typography variant="h6">Body</Typography>
          <Typography variant="p" component={"p"} sx={{ mb: 2 }}>
            Introduce the problem and expand on what you put in the title
          </Typography>
          <ReactQuill
            value={formData.body}
            onChange={handleBodyChange}
            className="react-quill"
            theme="snow"
          />
        </Box>
        <Box>
          <Typography variant="h6">Tags</Typography>
          <Typography variant="p" component={"p"} sx={{ mb: 2 }}>
            Add up to 5 tags to describe what your question is about. Start
            typing to see suggestions.
          </Typography>
          <TagsInput
            value={selected}
            onChange={setSelected}
            name="tags"
            placeHolder="Press enter to add tags"
          />
        </Box>

        <Button
          disabled={loading}
          onClick={handleFormSubmit}
          sx={{ mt: 4 }}
          variant="contained"
        >
          {loading ? "adding ...." : "Add Question"}
        </Button>
      </Paper>
    </Container>
  );
}

export default AskQuestion;
