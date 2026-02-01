import { useContext } from "react";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

import { MdOutlineShoppingCart } from "react-icons/md";
import { IoGitCompareOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";

import DrawerContext from "../../Contexts/DrawerContext";
import { ListContext } from "../../Contexts/ListContext";
import UserContext from "../../Contexts/UserContext";

import UserMenu from "./UserMenu";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
  },
}));

function HeaderActions() {
  const { orders } = useContext(DrawerContext);
  const { products } = useContext(ListContext);
  const { user } = useContext(UserContext);

  return (
    <ul className="flex items-center justify-end gap-3 w-full">
      <li className="list-none">
        {user.isLogged ? (
          <UserMenu />
        ) : (
          <>
            <Link to="/login" className="link text-[15px] pl-7">
              Login
            </Link>
            &nbsp;|&nbsp;
            <Link to="/register" className="link text-[15px]">
              Register
            </Link>
          </>
        )}
      </li>

      <li>
        <Tooltip title="Compare">
          <IconButton>
            <StyledBadge badgeContent={4} color="secondary">
              <IoGitCompareOutline />
            </StyledBadge>
          </IconButton>
        </Tooltip>
      </li>

      <li>
        <Tooltip title="Wishlist">
          <Link to="/list">
            <IconButton>
              <StyledBadge
                badgeContent={products.reduce((s, p) => s + p.qty, 0)}
                color="secondary"
              >
                <FaRegHeart />
              </StyledBadge>
            </IconButton>
          </Link>
        </Tooltip>
      </li>

      <li onClick={orders.open}>
        <Tooltip title="Cart">
          <IconButton>
            <StyledBadge
              badgeContent={orders.list.reduce((s, o) => s + o.qty, 0)}
              color="secondary"
            >
              <MdOutlineShoppingCart />
            </StyledBadge>
          </IconButton>
        </Tooltip>
      </li>
    </ul>
  );
}

export default HeaderActions;
