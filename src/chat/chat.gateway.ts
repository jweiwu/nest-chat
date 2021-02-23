import {
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { CACHE_MANAGER, Inject, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

interface Message {
  name: string;
  text: string;
}

interface User {
  id: string;
  name: string;
}

@WebSocketGateway(4000)
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('AppGateway');
  private users: User[] = [];

  constructor(
    private readonly chatService: ChatService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  onMessage(client: Socket, data: Message) {
    client.broadcast.emit('message', data);
    client.emit('message', data);
  }

  @SubscribeMessage('users')
  onUsers(client: Socket, data: string) {
    const uid = this.users.findIndex((u) => u.id === client.id);
    this.users[uid].name = data;
    client.emit('users', this.users);
    client.broadcast.emit('users', this.users);
  }

  afterInit() {
    this.logger.log(`Web socket server initialized`);
    this.users = [];
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
    this.users = [
      ...this.users,
      { id: client.id, name: client.handshake.query.name.toString() },
    ];
    client.emit('users', this.users);
    client.broadcast.emit('users', this.users);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    this.users = this.users.filter((u) => u.id !== client.id);
    client.broadcast.emit('users', this.users);
  }
}
