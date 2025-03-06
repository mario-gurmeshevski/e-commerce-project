const NotFound = () => {
    return (
        <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center px-4 py-8">
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-bold">404</h1>
            <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl mt-3 sm:mt-4">
                We're sorry, but the page you were looking for doesn't exist.
            </p>
        </div>
    );
};

export default NotFound;
