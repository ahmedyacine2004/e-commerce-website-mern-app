import { Menu, MenuItem } from "@mui/material";

export default function CategoryMenu({
  categoryAnchor,
  closeCategoryMenu,
  selectCategoryColumn,
  categoryColumn,
  categoryColumns,
}) {
  return (
    <Menu
      anchorEl={categoryAnchor}
      open={Boolean(categoryAnchor)}
      onClose={closeCategoryMenu}
      PaperProps={{
        sx: {
          width: categoryAnchor?.offsetWidth || "auto",
          borderRadius: 2,
          "& .MuiMenuItem-root": { fontSize: "0.85rem" },
        },
      }}
    >
      <MenuItem
        selected={!categoryColumn}
        onClick={() => selectCategoryColumn(null)}
      >
        None
      </MenuItem>
      {categoryColumns.map((col) => (
        <MenuItem
          key={col.accessor}
          selected={categoryColumn?.accessor === col.accessor}
          onClick={() => selectCategoryColumn(col)}
        >
          {col.header}
        </MenuItem>
      ))}
    </Menu>
  );
}
