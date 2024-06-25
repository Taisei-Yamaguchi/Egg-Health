"use client";
import { Account } from "@/interfaces/account.interface";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { fetchAccount } from "@/backend_api/accounts/fetchAccount";
import { useAppDispatch } from "@/store";
import { setToast } from "@/store/slices/toast.slice";
import { resetToast } from "@/store/slices/toast.slice";
import UpdateUserForm from "./UpdateUserForm";
import UpdatePassword from "./UpdatePassword";
import DeactivateAccount from "./DeactivateAccount";

const AccountUpdateForm: React.FC= () => {
    const dispatch = useAppDispatch()
    const [data,setData] = useState<Account | null>(null)
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleOpenModal = () => {
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchAccount();
                if ('error' in response) {
                    dispatch(setToast({ message: response.error, type: 'error' }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                    return;
                }
                if ('message' in response) {
                    setData(response.data);
                }
            } catch (error) {
                // console.error('Error fetching graph data:', error);
            }
        };
        fetchData();
    }, [dispatch]);

    return (
        <section className="relative">
        <section className="w-[95%] md:w-[80%] mx-auto py-10">
            <h1 className="text-3xl text-slate-700 font-semibold tracking-tight mb-10">
            Account Profile
            </h1>

            <h2 className="text-2xl text-slate-700 font-semibold tracking-tight mb-5">
            Account Details
            </h2>

            <hr className="border-b-1 w-full mb-10" />
            {/* Email */}
            <section className="mb-5">
                <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                    >
                    Email address
                </label>
                <p className="block w-full h-10 rounded-md px-4 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg sm:leading-6 pl-2">
                    {data && data.username}
                </p>
            </section>

            {/* update form mainly nickname */}
            {data &&<UpdateUserForm nickname={data?.nickname}/>}

            <hr className="border-b-1 w-full my-10" />

            <h2 className="text-2xl text-slate-700 font-semibold tracking-tight mb-5">
            Update Password
            </h2>

            <hr className="border-b-1 w-full mb-10" />

            <UpdatePassword />

            <hr className="border-b-1 w-full mb-10" />

            {/* <h2 className="text-2xl text-stone-700 font-semibold tracking-tight mb-10">
                Membership
            </h2> */}

            <section>
            <section className="grid grid-cols-1 lg:grid-cols-2">
                <section className="flex gap-x-5 items-center  w-full">
                {/* <h3 className="text-2xl text-stone-600 font-semibold tracking-tight">
                    Current Plan
                </h3> */}
                {/* <div className={`${user.license.type === "free" ? "bg-gray-200 text-gray-700" : "bg-orange-500 text-white"} font-bold text-lg text-slate-900 w-fit px-5 py-2 rounded`}>
                    {(user.license.type === "free") ? "Free" : "Premium"}
                </div> */}
                </section>
                {/* {
                (user.license.type !== "premium") && (
                    <section>
                    <button
                        type="submit"
                        className="flex w-fit justify-center rounded-md bg-indigo-600 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handleOpenModal}
                    >
                        upgrade to premium
                    </button>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={handleCloseModal}
                        ariaHideApp={false}
                        style={{
                        overlay: {
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                        },
                        content: {
                            width: "50%",
                            height: "50%",
                            margin: "auto",
                            padding: "5px",
                            border: "none",
                            borderRadius: "0.75rem",
                        },
                        }}
                    >
                        <div className="flex justify-end">
                        <button onClick={handleCloseModal}>✖️</button>
                        </div>
                        <LicensePopup
                        license={user.license}
                        closeModal={handleCloseModal}
                        />
                    </Modal>
                    </section>
                )
                } */}
            </section>
            {/* {(user.license.type === "premium") && (
                <section className="mt-5">
                <div className="flex">
                    <p className="font-bold text-slate-700 p-2 w-[110px] text-left border-b">Start Date:</p>
                    <p className="font-semibold text-blue-700 p-2 border-b">
                    {moment(user.license?.startDate).utc().format('MMMM D, YYYY')}
                    </p>
                </div>
                <div className="flex">
                    <p className="font-bold text-slate-700 p-2 w-[110px] text-left border-b">End Date:</p>
                    <p className="font-semibold text-blue-700 p-2 border-b">
                    {moment(user.license?.endDate).utc().format('MMMM D, YYYY')}
                    </p>
                </div>
                </section>
            )} */}
            </section>

            <hr className="border-b-1 w-full my-10" />

            <section className="block lg:flex lg:items-center lg:gap-x-3 w-full">
            <h2 className="lg:w-4/12 text-xl text-stone-700 font-semibold tracking-tight mb-6 lg:mb-0">
                Deativate Account
            </h2>
            <div className="lg:w-8/12 h-auto">
                <DeactivateAccount />
            </div>
            </section>
        </section>
        </section>
    );
};

export default AccountUpdateForm;
