import { FormLabel, Grid } from '@mui/material';
import { LoginForm } from 'features/auth/ui';
import React from 'react';

export const Login = () => {
	return (
		<div className="login-container">
			<Grid item xs={4} sx={{ maxWidth: '450px' }}>
				<FormLabel>
					<p>
						To log in get registered{' '}
						<a href={'https://social-network.samuraijs.com/'} target={'_blank'} rel="noreferrer">
							here
						</a>{' '}
						or use
					</p>
					<p> common test account credentials:</p>
					<p> Email: free@samuraijs.com</p>
					<p>Password: free</p>
				</FormLabel>
				<LoginForm />
			</Grid>
		</div>
	);
};
