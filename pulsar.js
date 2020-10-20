const Pulsar = require("pulsar-client");

const client = new Pulsar.Client({
    serviceUrl: "pulsar://localhost:6650",
    authentication: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJicm9rZXItYWRtaW4ifQ.apHQuZHv5KiaWrlQSlN4kk_hzG4WD-s7zh74FPgsbF2pVLVgOsFy-JA3kFtTawfYn7xGPFlvKiBkkdvWvque1U4Bx74dsOH67rHU-5We_kdRB75ocrY1jZbN3-EHYzbNMsAuRdpyeEtB5g7Stm-IxgPw0LVlREDeNePVFHqefr6O-NpVaphb6lEynMpSKE25jSdceixcoUeu9_gd3U9Te7JS7jGzn5hiEzDOhNSF-CGg-9a5ENtqmMB7O_5n9a7SqutsBVp8qziTieVLkPIm73x1TKhpN6vSyXMbspW82ySGhmXbS2mSjSCgBUE77aPe7JsrtewvbFdsR2CxW2r7G9"
});

process.on("message", ({ topic, subscription }) => {
    subscribe(topic, subscription);
});

const subscriptions = {};

const subscribe = async (topic, subscription) => {
    const key = topic + subscription;

    if (subscriptions[key]) {
        return;
    }
    try {
        const consumer = await client.subscribe({
            topic,
            subscription
        });
        subscriptions[key] = consumer;

        for (; ;) {
            const msg = await consumer.receive();
            consumer.acknowledge(msg);
            process.send({
                key,
                message: msg.getData().toString()
            });
        }
    } catch (error) {
        if (subscriptions[key]) {
            subscriptions[key].close();
            delete subscriptions[key];
        }
        process.send({
            key,
            error
        });
    }
};

