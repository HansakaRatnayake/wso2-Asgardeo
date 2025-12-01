import mongoose, { Schema, Document } from 'mongoose';

export interface IOrganization extends Document {
    name: string;
    domain: string;
    adminEmail: string;
    createdAt: Date;
}

const OrganizationSchema: Schema = new Schema({
    name: { type: String, required: true },
    domain: { type: String, required: true, unique: true },
    adminEmail: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IOrganization>('Organization', OrganizationSchema);
