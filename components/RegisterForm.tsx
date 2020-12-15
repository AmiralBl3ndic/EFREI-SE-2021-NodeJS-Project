import { useStoreActions } from 'easy-peasy';
import React from 'react';
import { useForm } from 'react-hook-form';
import ApplicationStore from 'store/appstore.model';
import Image from 'next/image';

const RegisterForm: React.FC = () => {
	const { register, handleSubmit } = useForm();

	const sendRegistering = useStoreActions<ApplicationStore>(
		(actions) => actions.registerWithUEmailUsernameAndPassword,
	);

	const onSubmit = (data) => {
		const objToSend = {
			username: data.username,
			password: data.password,
			email: data.email,
		};

		sendRegistering(objToSend);
	};

	return (
		<>
			<div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-8">
					<div>
						<div className="text-center">
							<Image src="/logo.png" alt="logo" width={180} height={90} />
						</div>
						<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
							Sign up to a new account
						</h2>
					</div>

					<br />
					<form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
						<input type="hidden" name="remember" value="true" />
						<div className="rounded-md shadow-sm -space-y-px">
							<div>
								<label className="sr-only">User name</label>
								<input
									name="username"
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									placeholder="Username"
									ref={register({ required: true })}
								/>
							</div>
							<br />
							<div>
								<label className="sr-only">Email address</label>
								<input
									name="email"
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									placeholder="Email"
									ref={register({ required: true })}
								/>
							</div>
							<br />
							<div>
								<label htmlFor="password" className="sr-only">
									Password
								</label>
								<input
									name="password"
									type="password"
									required
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									placeholder="Password"
									ref={register({ required: true })}
								/>
							</div>
						</div>

						<br />
						<div>
							<button
								type="submit"
								className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								Sign in
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default RegisterForm;
