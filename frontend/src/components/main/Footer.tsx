const Footer = () => {
    return (
        <footer className="text-zinc-500 text-center p-4 w-full h-[300px] max-sm:h-[450px] bg-yellow-50 flex flex-col items-end justify-between mb-[110px]">
            <div className="flex max-sm:flex-col my-4 self-start">
                    <div className="p-4 px-8 flex flex-col text-left">
                        <p className="text-base mr-4 font-bold "><a href='/services' className="hover:border-b">Our Services:</a></p>
                        <a href="/" className="text-xs font-semibold pr-4 hover:border-b my-1">Wellness Mons</a>
                        <a href="/bmr-calculator" className="text-xs pr-4 hover:border-b my-1">BMR Calculator</a>
                        <a href="/exercise-calories-calculator" className="text-xs pr-4 hover:border-b my-1">Exercise Calories Calculator</a>
                        <a href="/bmi-calculator" className="text-xs pr-4 hover:border-b my-1">BMI Calculator</a>
                    </div>

                    <div className="p-4 px-8 flex flex-col text-left">
                        <p className="text-base mr-4 font-bold "><a href="/articles" className="hover:border-b">Articles:</a></p>
                        <p className="text-xs mr-4 hover:border-b my-1">coming soon</p>
                    </div>
                </div>
            <div className="flex flex-col w-full">
                <p>&copy; 2024 Wellness Mons. All Rights Reserved.</p>
                
                <div className="border-t p-4 w-screen px-8 flex flex-wrap max-sm:flex-col">
                    <a href="/terms" className="text-xs mr-4 hover:border-b">Terms and Conditions</a>
                    <a href="/privacy-policy" className="text-xs mr-4 hover:border-b">Privacy Policy</a>
                    <a href="/cookie-policy" className="text-xs mr-4 hover:border-b">Cookie Policy</a>
                    <a href="/faq" className="text-xs mr-4 hover:border-b">FAQ</a>
                    <a href="/contact" className="text-xs mr-4 hover:border-b">Contact Inquiry</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
