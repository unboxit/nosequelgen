'use strict'

var faker = require('faker')
var mongoose = require('mongoose')

var uri = 'mongodb://localhost/dbtests'
mongoose.connect(uri)

var AccountSchema = mongoose.Schema({
  username: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  zip: String
})

var Account = mongoose.model('Account', AccountSchema)

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('connected')
})

var account = new Account({
  username: faker.internet.userName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  zip: faker.address.zipCode()
})

account.save(function (err, data) {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
})

mongoose.disconnect()
