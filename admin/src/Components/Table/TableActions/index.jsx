// TableActions.jsx
import { IconButton, Button, Tooltip } from "@mui/material";

export default function TableActions({ actions }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      {actions.map(
        ({ icon, label, onClick, color, variant, type, disabled }, idx) => {
          // ICON BUTTON
          if (type === "icon") {
            return (
              <Tooltip title={label} key={idx}>
                <span>
                  <IconButton
                    size="small"
                    onClick={onClick}
                    disabled={disabled}
                    sx={{
                      borderRadius: 1,
                      padding: "6px",
                      color: disabled
                        ? "action.disabled"
                        : color || "text.secondary",
                    }}
                  >
                    {icon}
                  </IconButton>
                </span>
              </Tooltip>
            );
          }

          // NORMAL BUTTON
          return (
            <Button
              key={idx}
              size="small"
              variant={variant || "outlined"}
              color={color || "primary"}
              onClick={onClick}
              disabled={disabled}
            >
              {icon && <span style={{ marginRight: 4 }}>{icon}</span>}
              {label}
            </Button>
          );
        },
      )}
    </div>
  );
}
