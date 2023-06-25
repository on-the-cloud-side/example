const redis = require("redis");

exports.add = async function test() {

    // complex Connection configuration to a remote redis
    // 
    // const cacheConnection = redis.createClient({
    //     // rediss for TLS
    //     url: `rediss://${redisHostName}:${noderisPort}`,
    //     password: redisPassword
    // });
    //
    // but we are using local linux server inside a container
    const cacheConnection = redis.createClient();
    // The above code connects to localhost on port 6379. 
    //
    // To connect to a different host or port, use a connection string in the format 
    // redis[s]://[[username][:password]@][host][:port][/db-number]:
    // example
    // createClient({
    //     url: 'redis://alice:foobared@awesome.redis.server:6380'
    // });

    // Connect to Redis
    await cacheConnection.connect();

    // PING command
    console.log("\nCache command: PING");
    console.log("Cache response : " + await cacheConnection.ping());

    // GET
    console.log("\nCache command: GET Message");
    console.log("Cache response : " + await cacheConnection.get("Message"));

    // SET
    console.log("\nCache command: SET Message");
    console.log("Cache response : " + await cacheConnection.set("Message",
        "Hello! The cache is working from Node.js!"));

    // GET again
    console.log("\nCache command: GET Message");
    console.log("Cache response : " + await cacheConnection.get("Message"));

    // Client list, useful to see if connection list is growing...
    console.log("\nCache command: CLIENT LIST");
    console.log("Cache response : " + await cacheConnection.sendCommand(["CLIENT", "LIST"]));

    // Disconnect
    cacheConnection.disconnect()

    return "testredis.test() Done"
}

// test().then((result) => console.log(result)).catch(ex => console.log(ex));