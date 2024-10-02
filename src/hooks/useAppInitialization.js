import React from 'react';
import { useGetCurrentUser } from 'hooks/queries/user/useGetCurrentUser';
import { usePostDemoUser } from 'hooks/queries/user/usePostDemoUser';
import { useGetUserProjects } from 'hooks/queries/projects/useGetUserProjects';

function useAppInitialization() {
	const { isError: isErrorUser, isLoading: isLoadingUser } = useGetCurrentUser();
	const shouldLoadDemoUser = !isLoadingUser && isErrorUser;

	const { isError: isErrorDemoUser, isLoading: isLoadingDemoUser } = usePostDemoUser(
		shouldLoadDemoUser
	);
	const { isLoading: isLoadingUserProjects, isError: isErrorUserProjects } = useGetUserProjects();

	if (isLoadingUser || isLoadingDemoUser || isLoadingUserProjects) {
		return {
			isLoading: true,
		};
	}

	if (isErrorUser || isErrorDemoUser || isErrorUserProjects) {
		return {
			isError: true,
		};
	}

	return {
		isLoading: false,
		isError: false,
		isSuccess: true,
	};
}

export default useAppInitialization;
