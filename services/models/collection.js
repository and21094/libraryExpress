'use strict'

const mongoose = require('mongoose');
const Promise = require('bluebird');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true },
  type: {type: Number, default: 1},
  user: { type: String, required: true },
  objects: { type: Object, required: false },
  created_at: { type: Number, default: new Date().getTime() },
})

var Collection = mongoose.model('Collection', schema);

class Collections {

  constructor(db) {
    this.db = db
  }

  find(data, callback) {

    // var user = new User(data)

    const task = Promise.coroutine(
      function* main() {
        if (!this.connected) {
          yield this.db.connect()
        }

        return new Promise((resolve, reject) => {
          Collection.find({user: data})
            .then(res => {
              resolve({ result: true, data: res })
            })
            .catch(err => {
            //   reject(new StandardError({ message: 'error creating user', code: 'error-db02' }))
            reject({message: 'error finding collections', err});
            })
        })
      }.bind(this)

    )

    return Promise.resolve(task()).asCallback(callback)
  }

}

module.exports = Collections;
