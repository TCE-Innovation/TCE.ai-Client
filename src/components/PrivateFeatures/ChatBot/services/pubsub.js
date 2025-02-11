class PubSub {
  constructor(name) {
    this.subscribers = [];
    this.name = name;
    this.publish = this.publish.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.currentData = null;
  }
  publish(data) {
    this.currentData = data;
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
  getCurrentData() {
    return this.currentData;
  }
}

export default PubSub;
