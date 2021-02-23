import { CacheModule, Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [CacheModule.register()],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
