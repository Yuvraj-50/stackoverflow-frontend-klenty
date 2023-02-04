import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { removeUser } from "../../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { topleftalert } from "../../utils/alert.js";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [searchValue, setSearchValue] = useState("");
  const { isAuthenticated } = useSelector((state) => state.user);
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleProfileMenuOpen(e) {
    setAnchorEl(e.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  async function getSearchResult() {
    if (!isAuthenticated) {
      topleftalert({ message: "Login to get search results", icon: "error" });
      return;
    }

    try {
      setSearchParams(`search=${searchValue.trim()}`);
    } catch (error) {
      console.log(error);
      topleftalert({ message: "something went wrong", icon: "error" });
    }
  }

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          navigate("/profile");
          handleMenuClose();
        }}
      >
        Profile
      </MenuItem>
      <MenuItem
        onClick={() => {
          dispatch(removeUser());
          Cookies.remove("token");
          handleMenuClose();
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  );

  function goToHome() {
    navigate("/");
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: { xs: 2, sm: 5 },
          }}
        >
          <Typography
            onClick={goToHome}
            variant="h6"
            noWrap
            component="div"
            sx={{ cursor: "pointer", display: { sm: "block" } }}
          >
            STACK
          </Typography>

          <Search sx={{ flex: 1 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              placeholder="Search…"
              sx={{ width: "90%" }}
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Button
            onClick={getSearchResult}
            color="inherit"
            sx={{ color: "black" }}
            variant="contained"
          >
            Search
          </Button>
          <Avatar onClick={handleProfileMenuOpen} sx={{ cursor: "pointer" }} />
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
