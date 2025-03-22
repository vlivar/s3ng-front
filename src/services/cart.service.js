import * as signalR from '@microsoft/signalr';

const URL = 'http://localhost:5015/carthub';

export const CartService = {
    connection: new signalR.HubConnectionBuilder()
        .withUrl(URL, {
            transport: signalR.HttpTransportType.WebSockets,
            withCredentials: false,
        })
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build(),
  
    isSubscribed: false,

    init() {
        this.connection.start().catch(err => console.error('SignalR Connection Error: ', err));
    },
  
    onCartUpdate(callback) {
        if (!this.isSubscribed) {
            this.connection.on('ReceiveCartUpdate', (userId, cart) => {
            console.log(`Cart updated for user ${userId}:`, cart);
            callback(userId, cart);
            });
            this.isSubscribed = true;
        }
    },
  
    addToCart(userId, item) {
        const newAbortController = new AbortController();
        this.connection.invoke('AddToCart', userId, item, newAbortController)
            .catch(err => console.error('SignalR AddToCart Error: ', err));
    },
  
    removeFromCart(userId, productId) {
        const newAbortController = new AbortController();
        this.connection.invoke('RemoveFromCart', userId, productId, newAbortController)
            .catch(err => console.error('SignalR RemoveFromCart Error: ', err));
    },
  
    getCart(userId) {
        const newAbortController = new AbortController();
        this.connection.invoke('GetCart', userId, newAbortController)
            .catch(err => console.error('SignalR GetCart Error: ', err));
    },

    clearCart(userId) {
        const newAbortController = new AbortController();
        this.connection.invoke('ClearCart', userId, newAbortController)
            .catch(err => console.error('SignalR ClearCart Error: ', err));
    }
  };
  
  CartService.init();