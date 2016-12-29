import {ObjectId} from 'mongodb';

export const todoDefs = `
  type Todo{
    _id: String
    text: String
    complete: Boolean
    createAt: Date
  }
`;

export const Todo = {
  async insert(ctx, text){
    const {ops: [todo]} = await ctx.mongo.collection('todos').insert({text, complete: false, createAt: new Date()});
    return todo;
  },
  async update(ctx, id, text){
    await ctx.mongo.collection('todos').updateOne({_id: ObjectId(id)}, {$set: {text}});
  },
  async changeManyState(ctx, ids, complete){
    const objIds = ids.map(id => new ObjectId(id));
    await ctx.mongo.collection('todos').updateMany({_id: {$in: objIds}}, {$set: {complete}});
  },
  async removeMany(ctx, ids){
    const objIds = ids.map(id => new ObjectId(id));
    await ctx.mongo.collection('todos').remove({_id: {$in: objIds}});
  },
  async all(ctx) {
    return await ctx.mongo.collection('todos').find().sort({'createAt': -1}).toArray();
  },
}