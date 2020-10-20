const fs = require('fs');
const Pulsar = require("pulsar-client");

const client = new Pulsar.Client({
    serviceUrl: "pulsar://localhost:6650",
    authentication: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJicm9rZXItYWRtaW4ifQ.apHQuZHv5KiaWrlQSlN4kk_hzG4WD-s7zh74FPgsbF2pVLVgOsFy-JA3kFtTawfYn7xGPFlvKiBkkdvWvque1U4Bx74dsOH67rHU-5We_kdRB75ocrY1jZbN3-EHYzbNMsAuRdpyeEtB5g7Stm-IxgPw0LVlREDeNePVFHqefr6O-NpVaphb6lEynMpSKE25jSdceixcoUeu9_gd3U9Te7JS7jGzn5hiEzDOhNSF-CGg-9a5ENtqmMB7O_5n9a7SqutsBVp8qziTieVLkPIm73x1TKhpN6vSyXMbspW82ySGhmXbS2mSjSCgBUE77aPe7JsrtewvbFdsR2CxW2r7G9"
});

const subscribe = async ({
    topic,
    subscription,
    subscriptionType,
    onMessage,
    onError
}) => {
    const consumer = await client.subscribe({
        topic,
        subscription: 'sub1',
        subscriptionType,
    });
        for (;;) {
            try {
                const msg = await consumer.receive();
                consumer.acknowledge(msg);
                onMessage(msg.getData().toString());
            } catch (e) {
                if (e) {
                    consumer.close();
                    onError(e);
                    break;
                }
            }
        }
};

// Subscribing to pulsar's new comment topic
function subscribePulsar(topic, handler) {
    subscribe({
            topic: topic,
            subscription: topic + '-sub',
            onMessage: handler,
            onError: console.error
        })
        .then(() => console.info("Subscribed to PULSAR:", topic))
        .catch(error => {
            console.error(error);
        });
}
function handler(msg){
    console.info('MSG: ', msg);
}

subscribePulsar("test1", handler);
subscribePulsar("test2", handler);
subscribePulsar("test3", handler);
subscribePulsar("test4", handler);
// subscribePulsar("test5", handler);

let counter = 0
setInterval(() => {

    /* CHECKING readFile or readdir */
    fs.readdir('./', (err, data)=>{
        console.log(data);
    });

    console.log(`-------------------------${counter++}----------------------------`);
}, 1000);
