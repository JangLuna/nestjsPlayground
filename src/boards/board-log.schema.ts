import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BoardObj } from './board.schema';

export type BoardDocument = BoardLog & Document;

@Schema()
export class BoardLog {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'BoardObj' })
	boardObj: BoardObj;

	@Prop()
	created_data: Date;
}
