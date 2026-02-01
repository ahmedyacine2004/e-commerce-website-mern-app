import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    transformOrigin={{ vertical: "top", horizontal: "left" }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 10,
    padding: "8px",
    backgroundColor: "#fff",
    boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
    "& .MuiMenu-list": {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      padding: 0,
    },
    "& .MuiMenuItem-root": {
      padding: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      "&:hover": {
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
      },
    },
  },
}));

export default StyledMenu;
