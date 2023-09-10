import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { useLogin } from 'features/auth/lib/useLogin';
import React from 'react';

export const LoginForm = () => {
	const { formik } = useLogin();

	const emailError = !!(formik.touched.email && formik.errors.email);
	const emailLabel = emailError ? formik.errors.email : 'Email';

	const passwordError = !!(formik.touched.password && formik.errors.password);
	const passwordLabel = passwordError ? formik.errors.password : 'Password';

	return (
		<form onSubmit={formik.handleSubmit}>
			<FormControl sx={{ display: 'block' }}>
				<FormGroup>
					<TextField label={emailLabel} error={emailError} margin="normal" {...formik.getFieldProps('email')} />
					<TextField
						type="password"
						label={passwordLabel}
						error={passwordError}
						margin="normal"
						{...formik.getFieldProps('password')}
					/>
					<FormControlLabel
						label={'Remember me'}
						control={<Checkbox {...formik.getFieldProps('rememberMe')} checked={formik.values.rememberMe} />}
					/>
					<Button type={'submit'} variant={'contained'} disabled={!(formik.isValid && formik.dirty)} color={'primary'}>
						Login
					</Button>
				</FormGroup>
			</FormControl>
		</form>
	);
};
