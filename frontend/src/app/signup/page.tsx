import { SignUpForm } from "@/components/auth/signupForm";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";

export default function SignUpPage() {
	return (
		<section className="flex flex-col  ">
			<SignUpForm />
			<div className="self-center">
				<GoogleLoginButton />
			</div>
		</section>
	);
}
