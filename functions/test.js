exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'HH',
      age: 66,
      email: 'kyoo119@gmail.com'
    })
  }
}
