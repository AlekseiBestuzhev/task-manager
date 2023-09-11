import React, { FC, PropsWithChildren, memo, useEffect, useState } from 'react';
import { CreateListModal } from 'widgets/create-list-modal';
import { ErrorSnackbar } from 'shared/components';
import { Sidebar } from 'widgets/sidebar';
import { Header } from 'widgets/header';

type Props = {
	isLoggedIn: boolean;
	logout: () => void;
} & PropsWithChildren;

export const Layout: FC<Props> = memo(({ isLoggedIn, logout, children }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const [sidebarOpen, setSidebarOpen] = useState(false);

	useEffect(() => {
		sidebarOpen && (document.body.style.overflow = 'hidden');
		!sidebarOpen && (document.body.style.overflow = 'unset');
	}, [sidebarOpen]);

	return (
		<>
			<Header
				isLoggedIn={isLoggedIn}
				logout={logout}
				title="List Manager"
				openModal={() => setModalOpen(true)}
				openSidebar={() => setSidebarOpen(true)}
			/>
			<Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
			<CreateListModal onClose={() => setModalOpen(false)} open={modalOpen} />
			{children}
			<ErrorSnackbar />
		</>
	);
});
