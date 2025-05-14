const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="mx-auto text-center md:w-6/12 my-12">
            <p className="text-sm text-gray-500 tracking-widest uppercase mb-3 animate-fade-in">
                {subHeading}
            </p>
            <h2 className="text-4xl font-bold text-gray-800 relative inline-block">
                {heading}
                <span className="block h-1 w-24 bg-gradient-to-r from-yellow-500 to-yellow-300 mx-auto mt-3 rounded-full animate-slide-in" />
            </h2>
        </div>
    );
};

export default SectionTitle;
