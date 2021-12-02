export class KafkaClientMock {
  data: any;

  public send(data: any) {
    this.data = data;
  }
}
