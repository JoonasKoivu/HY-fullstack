const mongoose = require('mongoose')
const Person = require('./models/person')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const url = process.env.MONGODB_URI

mongoose.connect(
    url,
    (err) => {
     if(err) console.log(err) 
     else console.log("mongdb is connected");
    }
  );


const personSchema = new mongoose.Schema({
  name: String,
  number: Number
})

const Person = mongoose.model('Person', personSchema)

if(name && number){
    const person = new Person({
        name: name,
        number: number,
    })
    
    person.save().then((result) => {
      console.log('person saved!')
      mongoose.connection.close()
    })
} else {
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person)
        })
        mongoose.connection.close()
      })
}


