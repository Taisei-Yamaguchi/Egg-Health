import { FC, ReactNode } from 'react';
import { Metadata } from 'next';
import GraphNav from '@/components/navigation/GraphNav';

export const metadata: Metadata = {
    title: "Graph",
    description: "This is the graph page for Egg Health.",
};

const GraphLayout: FC<{children: ReactNode}> = async ({ children }) => {

    return (
        <div className="mt-0">
            <GraphNav />
            {children}
            <div className="flex">
                <div className="w-1/3 h-[200px] bg-slate-200 border">
                    ads
                </div>
                <div className="w-1/3 h-[200px] bg-slate-200 border">
                    ads
                </div>
            </div>
            <div className="w-full h-[400px] bg-yellow-200">
                footer
            </div>
        </div>
    );
};

export default GraphLayout;
