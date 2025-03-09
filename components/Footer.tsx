import LinkData from "@/constant/Link.data";
import Link from "next/link";

function Footer() {
    return (
        <footer className="bg-indigo-700 text-white text-center py-4">
            <div className="container mx-auto flex flex-col items-center">
                <p className="text-lg font-semibold">Event Register &copy; {new Date().getFullYear()}</p>

                {/* Footer Links */}
                <div className="flex gap-6 mt-2">
                    {
                        LinkData.map((link, index) => (
                            <Link href={link.path
                            } key={index} className="hover:underline">
                                {link.title}
                            </Link>))
                    }

                </div>
            </div>
        </footer>
    );
}

export default Footer;
