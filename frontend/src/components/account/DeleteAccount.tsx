import Swal from 'sweetalert2';
import { deleteAccount } from '@/backend_api/accounts/deleteAccount';
import { deleteCookie } from 'cookies-next';
import { resetAuth } from '@/store/slices/auth.slice';
import { useAppDispatch } from '@/store';
import { useRouter } from 'next/navigation';

const DeleteAccount: React.FC = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()

	const handleDeleteUser = () => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!"
		}).then(async (result) => {
			if (result.isConfirmed) {
				await deleteAccount();
                deleteCookie('token');
                deleteCookie('id');
                deleteCookie('nickname');
                deleteCookie('username');
                dispatch(resetAuth())
                return router.push('/');
			}
		});

	};

	return (
		<form className="w-full" action={handleDeleteUser}>
			<div className="w-full">
				<button
					type="submit"
					className="flex w-full md:w-[50%] h-14 lg:h-auto justify-center items-center rounded-md bg-red-600 px-3 py-1.5 text-lg lg:text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
				>
					delete
				</button>
			</div>
		</form>
	);
};

export default DeleteAccount;
