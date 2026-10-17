import { Schema, model, Types } from 'mongoose';

export type Role = 'admin' | 'member';

export interface IProject {
  name: string;
  description: string;
  owner: Types.ObjectId;
  members: { user: Types.ObjectId; role: Role }[];
}

const projectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    members: [
      {
        _id: false,
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        role: { type: String, enum: ['admin', 'member'], default: 'member' },
      },
    ],
  },
  { timestamps: true }
);

export const Project = model<IProject>('Project', projectSchema);
