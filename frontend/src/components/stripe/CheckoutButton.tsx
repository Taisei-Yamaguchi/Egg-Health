"use client";
import { handleCheckout } from "@/helper/handleStripeCheckout";
import { createCheckoutSession } from "@/backend_api/license/createCheckoutSession";
import { useAppDispatch } from "@/store";
import { setToast } from "@/store/slices/toast.slice";
import { resetToast } from "@/store/slices/toast.slice";
import clsx from "clsx";

type CheckoutButtonProps = {
    itemLicense: 'premium' | 'premium_plus';
    itemPeriod: 'monthly' | 'yearly';
    label: string;
};

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ itemLicense, itemPeriod, label }) => {
    const dispatch = useAppDispatch();

    const handleClick = async () => {
        try {
            const response = await createCheckoutSession({ item_license: itemLicense, item_period: itemPeriod });
            if ('id' in response) {
                handleCheckout(response.id);
            } else if ('error' in response) {
                dispatch(setToast({ message: response.error, type: 'error' }));
                setTimeout(() => dispatch(resetToast()), 3000);
            }
        } catch {
            dispatch(setToast({ message: 'An error occurred.', type: "error" }));
            setTimeout(() => dispatch(resetToast()), 3000);
        }
    };

    return (
        <div className="relative inline-block">
            <button onClick={handleClick} className={clsx(
                'm-4 p-2 rounded-lg shadow-lg hover:scale-105 text-black font-bold',
                itemLicense === 'premium' && 'bg-gradient-to-r from-gray-200 to-gray-400',
                itemLicense === 'premium_plus' && 'bg-gradient-to-r from-yellow-400 to-yellow-600',
                itemLicense === 'premium_plus' && itemPeriod === 'yearly' && 'border m-2'
            )}>
                {label}
            </button>
            {itemLicense === 'premium_plus' && itemPeriod === 'yearly' && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-1 py-0.5 rounded-bl-lg">Best Value</span>
            )}
        </div>
    );
};

export default CheckoutButton;
