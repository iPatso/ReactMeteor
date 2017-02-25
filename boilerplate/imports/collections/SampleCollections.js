import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const SampleCollections = new Mongo.Collection('sampleCollections');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('sampleCollections', function sampleCollectionPublication() {
    // Can filter based on attribute values
    return SampleCollections.find({});
  });
}

Meteor.methods({
  'sampleCollections.insert'(text) {
    check(text, String);

    SampleCollections.insert({
      text,
      createdAt: new Date(),
    });
  },
  'sampleCollections.remove'(sampleCollectionId) {
    check(sampleCollectionId, String);

    SampleCollections.remove(taskId);
  },
});
