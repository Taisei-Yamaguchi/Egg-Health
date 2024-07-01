"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "@/store";
import { setToast, resetToast } from "@/store/slices/toast.slice";
import { fetchAccount } from "@/backend_api/accounts/fetchAccount";
import UpdateUserForm from "./UpdateUserForm";
import UpdatePassword from "./UpdatePassword";
import DeactivateAccount from "./DeactivateAccount";
import CancelSubscriptionButton from "@/components/stripe/CancelSubscriptionButton";
import { LicenseDetail } from "@/interfaces/license.interface";
import { fetchLicenseDetail } from "@/backend_api/license/fetchLicenseDetail";
import { Account } from "@/interfaces/account.interface";

const AccountUpdateForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const [data, setData] = useState<Account | null>(null);
    const [licenseDetail, setLicenseDetail] = useState<null | LicenseDetail>(null);

    useEffect(() => {
        const fetchLicenseDetails = async () => {
            try {
                const response = await fetchLicenseDetail();
                if ("error" in response) {
                    dispatch(setToast({ message: response.error, type: "error" }));
                    setTimeout(() => dispatch(resetToast()), 3000);
                    return;
                }
                if ("message" in response) {
                    setLicenseDetail(response.data);
                }
            } catch (error) {
                // Handle error
            }
        };
        fetchLicenseDetails();
    }, [dispatch]);

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
                // Handle error
            }
        };
        fetchData();
    }, [dispatch]);

    const renderLicenseDetails = () => {
        if (!licenseDetail) return null;

        const { license_type, billing_period, start_date, end_date, is_subscription_active } = licenseDetail;

        const displayLicenseType = license_type === "premium_plus" ? "Premium+" : license_type.charAt(0).toUpperCase() + license_type.slice(1);

        return (
            <div className="bg-gray-100 rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-2xl text-slate-700 font-semibold mb-4">Current Plan</h3>
                <div className="flex items-center mb-4">
                    <span className={`px-4 py-2 rounded font-bold
                        ${license_type === "free" && "text-white bg-gradient-to-r from-orange-600 to-rose-800"}
                        ${license_type === "premium" && "text-black bg-gradient-to-r from-gray-200 to-gray-400"}
                        ${license_type === "premium_plus" && "text-black bg-gradient-to-r from-yellow-400 to-yellow-600"}
                    `}>
                        {displayLicenseType}
                    </span>
                </div>
                {license_type !== "free" && (
                    <>
                        <div className="flex mb-4">
                            <span className="font-bold w-32">Start Date:</span>
                            <span>{start_date}</span>
                        </div>
                        {is_subscription_active ? (
                            <>
                                <div className="flex mb-4">
                                    <span className="font-bold w-32">Billing Period:</span>
                                    <span>{billing_period.charAt(0).toUpperCase() + billing_period.slice(1)} - ${billing_period === 'yearly' ? (license_type === 'premium' ? '66/year' : '99/year') : (license_type === 'premium' ? '6.6/month' : '9.9/month')}</span>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex mb-4">
                                    <span className="font-bold w-32">End Date:</span>
                                    <span>{end_date}</span>
                                </div>
                                <span className="text-purple-400">*Subscription is canceled but active until the end date.</span>
                            </>
                        )}
                    </>
                )}
            </div>
        );
    };

    return (
        <section className="relative">
            <section className="w-[95%] md:w-[80%] mx-auto py-10">
                <h1 className="text-3xl text-slate-700 font-semibold tracking-tight mb-10">Account Profile</h1>

                <h2 className="text-2xl text-slate-700 font-semibold tracking-tight mb-5">Account Details</h2>
                <hr className="border-b-1 w-full mb-10" />
                
                <section className="mb-5">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 mb-2">Email address</label>
                    <p className="block w-full h-10 rounded-md px-4 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg sm:leading-6 pl-2">
                        {data && data.username}
                    </p>
                </section>

                {data && <UpdateUserForm nickname={data?.nickname} />}

                <hr className="border-b-1 w-full my-10" />

                <h2 className="text-2xl text-slate-700 font-semibold tracking-tight mb-5">Update Password</h2>
                <hr className="border-b-1 w-full mb-10" />
                <UpdatePassword />
                <hr className="border-b-1 w-full mb-10" />

                <h2 className="text-2xl text-stone-700 font-semibold tracking-tight mb-10">Membership Plan</h2>

                {renderLicenseDetails()}
                <div className="text-center mb-8">
                    <a
                        className="flex w-fit mx-auto justify-center rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        href="/dashboard/premium"
                    >
                        See more
                    </a>
                </div>
                
                <hr className="border-b-1 w-full my-10" />

                <section className="block lg:flex lg:items-center lg:gap-x-3 w-full">
                    <h2 className="lg:w-4/12 text-xl text-stone-700 font-semibold tracking-tight mb-6 lg:mb-0">Deactivate Account</h2>
                    <div className="lg:w-8/12 h-auto">
                        <DeactivateAccount />
                    </div>
                </section>
            </section>
        </section>
    );
};

export default AccountUpdateForm;
