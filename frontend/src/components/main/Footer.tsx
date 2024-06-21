
const Footer = () => {
	return (
        <footer className="text-zinc-500 text-center p-4 w-full h-[200px] bg-yellow-50 flex items-end justify-center flex mb-48">
            <div className="flex flex-col">
                <p >&copy; 2024 Wellness Mons. All Rights Reserved.</p>
                
                <div className="flex border-t p-4 w-screen px-8 flex-wrap max-sm:flex-col">
                    <a href="/terms" className="text-xs mr-4">Terms and Conditions</a>
                    <a href="/privacy-policy" className="text-xs mr-4">Privacy Policy</a>
                    <a href="/cookie-policy" className="text-xs mr-4">Cookie Policy</a>
                    <a href="/faq" className="text-xs mr-4">FAQ</a>
                    <a href="/contact" className="text-xs mr-4">Contact Inquiry</a>
                </div>
            </div>
        </footer>
	);
};
export default Footer;
