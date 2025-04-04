function Logo({ width = "100px",src="./big.png" }) {
    return (
        <div style={{ width }} className="ml-4">
            <img src={src} alt="Logo" className="w-full h-auto" />
        </div>
    );
}

export default Logo;
