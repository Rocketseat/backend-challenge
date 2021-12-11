export class KafkaClientMock {
  data: any;

  public send(topic: any, message: any) {
    this.data = { topic, message };
    return {
      subscribe: () => '',
    };
  }
}
