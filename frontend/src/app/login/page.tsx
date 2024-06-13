import { LoginForm } from "@/components/auth/loginForm";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";

export default function Login() {
	return (
		<div className="flex flex-col">
			<LoginForm />
			<div className="self-center">	
				<GoogleLoginButton/>
			</div>
		</div>
	);
}