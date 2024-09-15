// @ts-ignore
import { APIURL } from '@env';
import blockUiUtil from "../utils/block-ui.util.ts";

function instance(url: string, onOpen = () => {}, onMessage = () => {}, onError = (error: any) => {}, onClose = () => {}) {
  const socket = new WebSocket(APIURL + url);
  socket.onopen = onOpen;
  socket.onmessage = onMessage;
  socket.onerror = onError;
  socket.onclose = onClose;
  return socket;
}

class ISocket {
  ws: any;

  connect(url: string = '', onOpen = () => {}, onMessage = () => {}, onError = (error: any) => { blockUiUtil.hide(); }, onClose = () => {}) {
    this.ws = instance(url, onOpen, onMessage, onError, onClose);
  }

  disconnect() {
    this.ws.close();
  }
}

var websocket = new ISocket();

export default websocket;
