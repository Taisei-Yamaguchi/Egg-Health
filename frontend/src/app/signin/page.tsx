import { LoginForm } from "@/components/auth/loginForm";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";

export default function Login() {
	return (
		<div className="flex flex-col p-4 mt-14 max-md:mt-0">
			<LoginForm />
			<div className="text-center mt-4 mb-4">
				<p className="text-sm text-gray-600">
					By signing up, you agree to our{" "}
					<a
						href="/terms"
						className="text-blue-500 underline"
						target="_blank"
						rel="noopener noreferrer"
					>
						Terms and Conditions
					</a>
					. Please make sure to read them.
				</p>
			</div>
			<div className="self-center">	
				<GoogleLoginButton/>
			</div>
		</div>
	);
}