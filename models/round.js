var mongoose = require('mongoose');

var roundSchema = new mongoose.Schema({
  candidate: { firstName: String, lastName: String},
  position: { title: String, description: String},
  date: String,
  //questions: [],
  questions: [
  	{question: String //,
  		// responses: [{ userId: String, interviewId: String, score: String, notes: String }]
  	}],
  interviews: [
  	{name: String}],
  responses: [{ userName: String, questionId: String, interviewId: String, score: String, notes: String }]
});

var Round = mongoose.model('Round', roundSchema);

module.exports = Round;



// var mongoose = require('mongoose');

// var roundSchema = new mongoose.Schema({
// // some stuff id commented out
//   candidateId: Number,
//   positionId: Number
// });

// var Round = mongoose.model('Round', roundSchema);

// module.exports = Round;