import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    asgardeoId: string;
    email: string;
    organizationId: mongoose.Types.ObjectId;
    role: string;
}

const UserSchema: Schema = new Schema({
    asgardeoId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    organizationId: { type: Schema.Types.ObjectId, ref: 'Organization' },
    role: { type: String, enum: ['admin', 'manager', 'staff', 'customer'], default: 'staff' },
});

export default mongoose.model<IUser>('User', UserSchema);
