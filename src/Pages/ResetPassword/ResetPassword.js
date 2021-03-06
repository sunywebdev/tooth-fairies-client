import {
	Alert,
	Button,
	Container,
	Grid,
	Snackbar,
	TextField,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import login from "../../images/login.png";
import { useHistory, useLocation } from "react-router";
import useAuth from "../../context/useAuth";
import Timer from "react-compound-timer";

const ResetPassword = () => {
	const { auth, error, resetPassword } = useAuth();
	const [state, setState] = useState([]);
	const [success, setSuccess] = useState();
	console.log(state);
	const location = useLocation();
	const history = useHistory();
	const errorMsg =
		error === "Firebase: Error (auth/user-not-found)."
			? "You Dont't Have Any Account"
			: "";
	const errorMsg2 =
		error === "Firebase: Error (auth/missing-email)."
			? "Enter A Email To Reset Password"
			: "";
	const [open, setOpen] = React.useState(false);
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};
	const { register, handleSubmit } = useForm();
	const onSubmit = (data) => {
		resetPassword(
			auth,
			data?.email,
			setState,
			setSuccess,
			data,
			history,
			location,
			setOpen,
		);
	};
	return (
		<Container>
			<Grid
				justifyContent='space-between'
				container
				spacing={0}
				sx={{ display: "flex", alignItems: "center" }}>
				<Grid item xs={12} md={4} sx={{ textAlign: "left", my: { xs: 5 } }}>
					<Typography
						color='#2886FC'
						sx={{ textAlign: "center", pb: 2, fontWeight: "bold" }}
						variant='h5'>
						Reset Password
					</Typography>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								"& > :not(style)": { m: 1 },
							}}>
							<TextField
								type='email'
								label='Your Email'
								variant='standard'
								{...register("email", { required: true })}
							/>
							<Typography
								color='error.main'
								sx={{ textAlign: "center", fontWeight: "bold" }}
								variant='body2'>
								{errorMsg || errorMsg2 ? errorMsg || errorMsg2 : success}
							</Typography>
							<Button
								type='submit'
								variant='contained'
								sx={{ mt: 3, backgroundColor: "#2886FC" }}>
								Reset Password
							</Button>
						</Box>
					</form>
					<div style={{ textAlign: "center" }}>
						<Link to='/login'>Login To Your Account</Link>
					</div>
				</Grid>
				<Grid item md={6}>
					<img
						src={login}
						alt=''
						style={{ width: "100%", maxHeight: "95vh" }}
					/>
				</Grid>
			</Grid>
			{!error && (
				<Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
					<Alert
						onClose={handleClose}
						variant='filled'
						sx={{ width: "100%", backgroundColor: "#2886FC" }}>
						Reset Request Successfull, Going Back To Desired Page in &nbsp;
						<Timer initialTime={5000} direction='backward'>
							{() => (
								<React.Fragment>
									<Timer.Seconds />
								</React.Fragment>
							)}
						</Timer>
					</Alert>
				</Snackbar>
			)}
		</Container>
	);
};

export default ResetPassword;
