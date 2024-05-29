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
        </div>
    );
};

export default GraphLayout;
