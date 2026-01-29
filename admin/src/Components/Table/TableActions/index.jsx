// TableActions.jsx
import { IconButton, Button, Tooltip } from "@mui/material";

export default function TableActions({ actions }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      {actions.map(({ icon, label, onClick, color, variant, type }, idx) => {
        // Decide which button type to render
        if (type === "icon") {
          return (
            <Tooltip title={label} key={idx}>
              <IconButton
                size="small"
                onClick={onClick}
                sx={{
                  borderRadius: 1,
                  padding: "6px",
                  color: color || "text.secondary",
                }}
              >
                {icon}
              </IconButton>
            </Tooltip>
          );
        } else {
          // default: normal button
          return (
            <Button
              key={idx}
              size="small"
              variant={variant || "outlined"}
              color={color || "primary"}
              onClick={onClick}
            >
              {icon ? <span style={{ marginRight: 4 }}>{icon}</span> : null}
              {label}
            </Button>
          );
        }
      })}
    </div>
  );
}
