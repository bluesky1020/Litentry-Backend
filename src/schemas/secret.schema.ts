import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Secret {
  @Prop({ required: true })
  secretCode: string;
}

export const SecretSchema = SchemaFactory.createForClass(Secret);
