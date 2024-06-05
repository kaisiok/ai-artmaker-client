function MyFooter() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <h1 className="text-xl font-bold mb-2">Wallmaker</h1>
        <p>&copy;2010-2011 Fontspring. All rights reserved.</p>
        <nav className="mb-2">
          <a href="/" className="text-gray-400 hover:text-white mx-2">
            Home
          </a>
          <a
            href="https://github.com/kaisiok/ai-artmaker-client"
            className="text-gray-400 hover:text-white mx-2"
          >
            GitHub-client
          </a>
          <a
            href="https://github.com/kaisiok/ai-artmaker-server"
            className="text-gray-400 hover:text-white mx-2"
          >
            GitHub-server
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default MyFooter;
