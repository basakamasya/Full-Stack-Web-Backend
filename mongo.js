if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

if (process.argv.length === 5) {

  const name =  process.argv[3]
  const number =  process.argv[4]

  mongoose
  .connect(url)
  .then((result) => {
    const contact = new phonebook({
      name: name,
      number: number,
    })

    return contact.save()
  })
  .then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))
}

else if (process.argv.length === 3) {
  mongoose
  .connect(url)
  phonebook.find({}).then(result => {
    console.log("phonebook:")
    result.forEach(contact => {
      console.log(contact.name, contact.number)  //display all of the entries in the phonebook
    })
    return mongoose.connection.close()
  })

  .catch((err) => console.log(err))
}



