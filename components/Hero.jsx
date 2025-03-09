import Link from "next/link";

function HeroSection() {
    return (
        <div className="min-h-[92dvh] bg-indigo-500 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-white text-5xl font-bold">Welcome to Event Register</h1>
            <h2 className="text-white text-xl mt-4">Discover & Register for Exciting Events!</h2>
            <Link href={"/register"} className="mt-6 px-6 py-3 bg-white text-indigo-500 font-semibold text-lg rounded-lg shadow-md hover:bg-gray-100 transition">
                Get Started
            </Link>
        </div>
    );
}

export default HeroSection;
