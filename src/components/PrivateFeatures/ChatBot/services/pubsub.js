class PubSub {
  constructor(name) {
    this.subscribers = [];
    this.name = name;
    this.publish = this.publish.bind(this);
    this.subscribe = this.subscribe.bind(this);
  }
  publish(data) {
    setTimeout(() => {
      this.subscribers.forEach((subscriber) => {
        subscriber(data);
      });
    }, 0);
  }
  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(
        (subscriber) => subscriber !== callback
      );
    };
  }
}

export default PubSub;
