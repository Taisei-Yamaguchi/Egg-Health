"use client";
import React, { useEffect, useState } from "react";
import CheckoutButton from "@/components/stripe/CheckoutButton";
import CancelSubscriptionButton from "@/components/stripe/CancelSubscriptionButton";
import { useAppDispatch } from "@/store";
import { LicenseDetail } from "@/interfaces/license.interface";
import { fetchLicenseDetail } from "@/backend_api/license/fetchLicenseDetail";
import { resetToast, setToast } from "@/store/slices/toast.slice";

const CheckoutPage = () => {
    const dispatch = useAppDispatch();
    const [licenseDetail, setLicenseDetail] = useState<null | LicenseDetail>(null);

    useEffect(() => {
        const fetchData = async () => {
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
        fetchData();
    }, [dispatch]);

    const renderSubscriptionInfo = () => {
        if (licenseDetail) {
            switch (licenseDetail.license_type) {
                case "free":
                    return (
                        <div className="mb-8">
                            <div className="p-6 bg-white rounded-lg shadow-md border border-gray-300">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Current Plan: <span className="my-1 rounded-lg p-2 bg-gradient-to-r from-orange-600 to-rose-800 text-white">Free</span></h2>
                                <p className="text-gray-700 mb-4">You are currently on the Free plan.</p>
                            </div>
                        </div>
                    );
                case "premium":
                    return (
                        <div className="mb-8">
                            <div className="p-6 bg-white rounded-lg shadow-md border border-blue-300">
                                <h2 className="text-2xl font-bold text-blue-800 mb-4">Current Plan: <span className="my-1 text-black rounded-lg p-2 bg-gradient-to-r from-gray-200 to-gray-400">Premium</span></h2>
                                <p className="text-blue-700 mb-4">
                                    You are currently on the Premium plan ({licenseDetail.billing_period === 'yearly' ? '$66/year' : '$6.6/month'}).
                                </p>
                                <p className="text-blue-700 mb-4">Start Date: {licenseDetail.start_date}</p>
                                {licenseDetail.is_subscription_active ? (
                                    <div className="text-center flex items-center max-sm:flex-col">
                                        <CancelSubscriptionButton />
                                        <a href='/dashboard' className="text-blue-500 hover:underline text-sm ml-4">
                                            go back to dashboard
                                        </a>
                                    </div>
                                ) : (
                                    <p className="text-blue-700 mb-4">End Date: {licenseDetail.end_date} (Subscription Canceled)</p>
                                )}
                            </div>
                        </div>
                    );
                case "premium_plus":
                    return (
                        <div className="mb-8">
                            <div className="p-6 bg-white rounded-lg shadow-md border border-yellow-300">
                                <h2 className="text-2xl font-bold text-yellow-800 mb-4">Current Plan: <span className="my-1 rounded-lg p-2 text-black bg-gradient-to-r from-yellow-400 to-yellow-600">Premium+</span></h2>
                                <p className="text-yellow-700 mb-4">
                                    You are currently on the Premium+ plan ({licenseDetail.billing_period === 'yearly' ? '$99/year' : '$9.9/month'}).
                                </p>
                                <p className="text-yellow-700 mb-4">Start Date: {licenseDetail.start_date}</p>
                                {licenseDetail.is_subscription_active ? (
                                    <div className="text-center flex items-center max-sm:flex-col">
                                        <CancelSubscriptionButton />
                                        <a href='/dashboard' className="text-blue-500 hover:underline text-sm ml-4">
                                            go back to dashboard
                                        </a>
                                    </div>
                                ) : (
                                    <p className="text-yellow-700 mb-4">End Date: {licenseDetail.end_date} (Subscription Canceled)</p>
                                )}
                            </div>
                        </div>
                    );
            }
        }
        return null;
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {renderSubscriptionInfo()}
            {licenseDetail && licenseDetail.license_type === 'free' && (
                <>
                    <div className="mb-8">
                        <div className="p-6 bg-gray-100 rounded-lg shadow-md border border-gray-300">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Premium Plan</h2>
                            <p className="text-gray-700 mb-4">The premium features will be as follows:</p>
                            <ul className="list-disc list-inside mb-4">
                                <li className="text-gray-700">The "Often" feature allows you to register frequently used foods and activities</li>
                                <li className="text-gray-700">The "Latest" feature allows you to reuse the latest records</li>
                                <li className="text-gray-700">The "Set" feature allows you to pre-set meals and exercises, recording them with a single click</li>
                            </ul>
                            <h3 className="text-xl font-bold text-gray-800">Pricing</h3>
                            <div className="flex space-x-4 mt-4">
                                <div>
                                    <CheckoutButton itemLicense="premium" itemPeriod="monthly" label="Subscribe to Premium Monthly - $6.6/month" />
                                </div>
                                <div>
                                    <CheckoutButton itemLicense="premium" itemPeriod="yearly" label="Subscribe to Premium Yearly - $66/year" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <div className="p-6 bg-yellow-100 rounded-lg shadow-md border border-yellow-300">
                            <h2 className="text-2xl font-bold text-yellow-800 mb-4">Premium+ Plan</h2>
                            <p className="text-yellow-700 mb-4">By subscribing to the Premium＋ Plan, you can unlock and grow multiple monsters in addition to the features of the Premium Plan!</p>
                            <p className="text-yellow-700 mb-4">Enjoy all the Premium Plan features, plus:</p>
                            <ul className="list-disc list-inside mb-4">
                                <li className="text-yellow-700">Unlock and grow multiple monsters</li>
                            </ul>
                            <h3 className="text-xl font-bold text-yellow-800">Pricing</h3>
                            <div className="flex space-x-4 mt-4">
                                <div>
                                    <CheckoutButton itemLicense="premium_plus" itemPeriod="monthly" label="Subscribe to Premium+ Monthly - $9.9/month" />
                                </div>
                                <div>
                                    <CheckoutButton itemLicense="premium_plus" itemPeriod="yearly" label="Subscribe to Premium+ Yearly - $99/year" />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {licenseDetail && licenseDetail.license_type === 'premium' && (
                <div className="mb-8">
                    <div className="p-6 bg-yellow-100 rounded-lg shadow-md border border-yellow-300">
                        <h2 className="text-2xl font-bold text-yellow-800 mb-4">Premium+ Plan</h2>
                        <p className="text-yellow-700 mb-4">By subscribing to the Premium＋ Plan, you can unlock and grow multiple monsters in addition to the features of the Premium Plan!</p>
                        <p className="text-yellow-700 mb-4">Enjoy all the Premium Plan features, plus:</p>
                        <ul className="list-disc list-inside mb-4">
                            <li className="text-yellow-700">Unlock and grow multiple monsters</li>
                        </ul>
                        <h3 className="text-xl font-bold text-yellow-800">Pricing</h3>
                        <div className="flex space-x-4 mt-4">
                            <div>
                                <CheckoutButton itemLicense="premium_plus" itemPeriod="monthly" label="Subscribe to Premium+ Monthly - $9.9/month" />
                            </div>
                            <div>
                                <CheckoutButton itemLicense="premium_plus" itemPeriod="yearly" label="Subscribe to Premium+ Yearly - $99/year" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;

