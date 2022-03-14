import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BoardObjDocument = BoardObj & Document;

@Schema()
export class BoardObj {
	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	writer: number;

	@Prop({ required: true })
	body: string;

	@Prop()
	created_data: Date;
}

export const BoardObjSchema = SchemaFactory.createForClass(BoardObj);
