const HomePage = () => {
  return (
    <>
      {/* What is WebSocket */}
      <div className="p-6 bg-white rounded-md shadow-sm">
        <h1 className="font-bold text-3xl mb-3">What is WebSocket</h1>
        <p>
          {" "}
          is a communication protocol that enables full-duplex (two-way)
          communication channels over a single, long-lived TCP connection.
          Unlike HTTP, which is request-response based, WebSocket allows
          continuous interaction between a client (typically a browser) and a
          server. Once established, a WebSocket connection stays open, enabling
          the server to send data to the client anytime without needing the
          client to request it.
        </p>
      </div>
      {/* Key Features of WebSocket */}
      <div className="flex justify-center gap-5">
        <div className="p-6 bg-white rounded-md shadow-md">
          <h1 className="font-bold">Key Features of WebSocket :</h1>
          <p>
            1. Persistent Connection: After the initial handshake, the
            connection remains open, reducing overhead and latency associated
            with constantly opening new connections.
          </p>
          <p>
            2.Real-time Communication: WebSockets support low-latency
            communication, making them ideal for real-time applications like
            chat apps, live updates, gaming, and financial tickers.
          </p>
          <p>
            3.Two-way Communication: Both the client and server can send
            messages to each other independently, facilitating interactive and
            dynamic applications.
          </p>
          <p>
            4.Efficient Data Transfer: WebSockets typically require less
            overhead than traditional HTTP connections because they don’t need
            to repeatedly establish new connections for each request.
          </p>
        </div>
        {/* How It Works */}
        <div className="p-6 bg-white rounded-md shadow-md">
          <h1 className="font-bold">How It Works :</h1>
          <p>
            1.The client sends an HTTP request to the server to initiate the
            WebSocket handshake.
          </p>
          <p>
            2.If the server supports WebSockets, it responds with a success
            status, and the HTTP connection is upgraded to a WebSocket
            connection.
          </p>
          <p>
            3.From then on, the server and client can send and receive messages
            freely through the open connection.:
          </p>
        </div>
      </div>
    </>
  );
};

export default HomePage;
