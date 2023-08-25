import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { useLogin } from 'features/auth/lib/useLogin';
import s from './LoginForm.module.css';
import React from 'react';

export const LoginForm = () => {
	const { formik } = useLogin();

	return (
		<form onSubmit={formik.handleSubmit}>
			<FormControl sx={{ display: 'block' }}>
				<FormGroup>
					<TextField label="Email" margin="normal" {...formik.getFieldProps('email')} />
					{formik.touched.email && formik.errors.email && <p className={s.error}>{formik.errors.email}</p>}
					<TextField type="password" label="Password" margin="normal" {...formik.getFieldProps('password')} />
					{formik.touched.password && formik.errors.password && <p className={s.error}>{formik.errors.password}</p>}
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
