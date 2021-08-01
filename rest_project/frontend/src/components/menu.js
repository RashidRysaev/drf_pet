import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";

import {Link} from 'react-router-dom';

const MenuPage = () => {
const [anchorEl, setAnchorEl] = React.useState(null);

const handleClose = () => {
	setAnchorEl(null);
};

const handleClick = (event) => {
	setAnchorEl(event.currentTarget);
};

return (
	<div
	style={{
        color: 'blue',
	}}
	>
	<Button
		aria-controls="simple-menu"
		aria-haspopup="true"
		onClick={handleClick}
	>
		Open Menu List
	</Button>
	<Menu
		keepMounted
		anchorEl={anchorEl}
		onClose={handleClose}
		open={Boolean(anchorEl)}
	>
		<MenuItem onClick={handleClose}>Link</MenuItem>
		<MenuItem onClick={handleClose}>One more link</MenuItem>
		<MenuItem onClick={handleClose}>And another link</MenuItem>
	</Menu>
	</div>
);
};

export default MenuPage;
