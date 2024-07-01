export interface LicenseDetail {
    license_type: 'free'|'premium'|'premium_plus';
    billing_period: 'monthly'|'yearly';
    start_date: string;
    end_date: string| null;
    is_subscription_active: boolean;
}
