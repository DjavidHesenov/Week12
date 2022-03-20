export default function Login({ connect }) {
    return (
        <div className="login flex flex-col ">
            <h1 className="text-2xl font-bold">Connect to your wallet.</h1>
            <button onClick={connect} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-[20%]">
                CONNECT
            </button>
        </div>
    )
}
