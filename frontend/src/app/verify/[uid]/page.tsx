import VerifyForm from "@/components/auth/verifyForm";

type Props = {
	params: { uid: string };
};

const Verify: React.FC<Props> = async ({params: {uid}})=>{    
	return (
		<VerifyForm uid={uid as string}/>
	);
}

export default Verify