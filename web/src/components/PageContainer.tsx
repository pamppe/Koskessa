import type { ReactNode } from "react";

export default function PageContainer({ children }: { children: ReactNode }) {
    return (
        <div
            style={{
                maxWidth: 1000,
                margin: "0 auto",
                padding: "16px 20px"
            }}
        >
            {children}
        </div>
    );
}
