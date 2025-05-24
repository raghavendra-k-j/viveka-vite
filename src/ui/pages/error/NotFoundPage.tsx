import React from "react";

const NotFoundPage: React.FC = () => (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <h1 className="text-4xl font-bold text-default mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-secondary">
            The page you are looking for does not exist.
        </p>
    </div>
);

export default NotFoundPage;
