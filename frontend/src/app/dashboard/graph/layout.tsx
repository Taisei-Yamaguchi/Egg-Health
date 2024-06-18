import { FC, ReactNode } from 'react';
import { Metadata } from 'next';
import GraphNav from '@/components/navigation/GraphNav';
import Ads from '@/components/main/Ads';

export const metadata: Metadata = {
    title: "Graph",
    description: "This is the graph page for Egg Health.",
};

const GraphLayout: FC<{children: ReactNode}> = async ({ children }) => {

    return (
        <div className="mt-0">
            <GraphNav />
            <div className='flex justify-between max-md:flex-col'>
                <div className='w-5/6 max-md:w-full'>{children}</div>
                <div className="w-1/6 h-[400px] w-[300px] max-sm:w-full max-sm:h-[150px]">
                    <Ads/>
                </div>
            </div>
            
            <div className="flex">
                <div className="w-1/3 h-[180px] max-sm:w-1/2 border">
                    <Ads/>
                </div>
                <div className="w-1/3 h-[180px] max-sm:w-1/2 border">
                    <Ads/>
                </div>
            </div>
        </div>
    );
};

export default GraphLayout;
