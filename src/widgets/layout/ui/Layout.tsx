import React, { FC, PropsWithChildren, memo, useState } from 'react';
import { CreateListModal } from 'widgets/create-list-modal';
import { ErrorSnackbar } from 'shared/components';
import { Header } from 'widgets/header';

type Props = {
	isLoggedIn: boolean;
	logout: () => void;
} & PropsWithChildren;

export const Layout: FC<Props> = memo(({ isLoggedIn, logout, children }) => {
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<div className="app-container">
			<Header isLoggedIn={isLoggedIn} logout={logout} title="List Manager" openModal={() => setModalOpen(true)} />
			<CreateListModal onClose={() => setModalOpen(false)} open={modalOpen} />
			{children}
			<ErrorSnackbar />
		</div>
	);
});
