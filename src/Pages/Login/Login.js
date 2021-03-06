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
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import login from "../../images/login.png";
import useAuth from "../../context/useAuth";
import GoogleIcon from "@mui/icons-material/Google";
import Timer from "react-compound-timer";

const Login = () => {
	const { signInUsingGoogle, signInWithEmailPassword, auth, error, user } =
		useAuth();
	const location = useLocation();
	const history = useHistory();
	console.log(error);
	const [open, setOpen] = React.useState(false);
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};
	const errorMsg =
		error === "Firebase: Error (auth/wrong-password)."
			? "Your password is Worng"
			: "";
	const errorMsg2 =
		error === "Firebase: Error (auth/user-not-found)."
			? "You don't have any account"
			: "";
	const handleGoogleLogin = () => {
		signInUsingGoogle(history, location, setOpen);
	};
	const { register, handleSubmit } = useForm();
	const onSubmit = (data) => {
		signInWithEmailPassword(
			auth,
			data.email,
			data.password,
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
						Login
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
							<TextField
								type='password'
								label='Your Password'
								variant='standard'
								{...register("password", { required: true })}
							/>
							<div style={{ textAlign: "left" }}>
								<Link to='/resetpassword'>Forgot Your Password?</Link>
							</div>
							<Typography
								color='error.main'
								sx={{ textAlign: "center", fontWeight: "bold" }}
								variant='body2'>
								{errorMsg}
								{errorMsg2}
							</Typography>
							<Button
								type='submit'
								variant='contained'
								sx={{ mt: 3, backgroundColor: "#2886FC" }}>
								Login
							</Button>
							<Button
								onClick={handleGoogleLogin}
								variant='contained'
								sx={{ mt: 3, backgroundColor: "#2886FC" }}>
								<GoogleIcon fontSize='small' sx={{ mr: 1 }}></GoogleIcon>Login
								With Google
							</Button>
						</Box>
					</form>
					<div style={{ textAlign: "center" }}>
						<Link to='/signup'>Don't Have An Account?</Link>
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
			{user?.email && !error && (
				<Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
					<Alert
						onClose={handleClose}
						variant='filled'
						sx={{ width: "100%", backgroundColor: "#2886FC" }}>
						Login Successfull, Going Back To Desired Page in &nbsp;
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

export default Login;
