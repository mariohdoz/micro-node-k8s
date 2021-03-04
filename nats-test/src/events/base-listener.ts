import {Message, Stan} from "node-nats-streaming";
import { Subjects } from "./subjects";

interface Event {
  subject: Subjects; 
  data: any;
}

abstract class listener<T extends Event> {

  abstract subject: T['subject']; 
  abstract queueGroupName: string;
  abstract onMessage(data: T['data'], msg: Message): void;
  private client: Stan;
  protected ackWait:number = 5 * 1000; 

  constructor(client: Stan) {
    this.client = client;
  }

  private subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName)
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on('message', (msg: Message) => {

      console.log(
        `Message recived: ${this.subject} / ${this.queueGroupName}`
      );

      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);

    });
  }

  private parseMessage(msg: Message) {
    const data = msg.getData();

    const aux_msg = typeof data === 'string'? JSON.parse(data) : JSON.parse(data.toString());
    
    return aux_msg;
  }

}

export {
  listener
}