// Import necessary models
const Interview = require('../models/interview');
const Student = require('../models/student');
const Result = require('../models/result');

// Render the result page for a specific interview
module.exports.resultPage = async function (req, res) {
  try {
    const id = req.params.id;
    
    // Retrieve the interview details by ID and populate associated students
    const companyResult = await Interview.findById(id).populate('students');

    // Render the 'result' view with the interview result data
    return res.render('result', {
      title: "Result",
      companyResult: companyResult
    });
  } catch (error) {
    return res.send('<h1>Error in loading result page</h1>'); // Display an error message if there's an issue
  }
};

// Handle updating interview results
module.exports.update = async function (req, res) {
  try {
    // Create a new result record using the data from the request body
    const updateResult = await Result.create(req.body);
    
    // Retrieve the interview ID from the request body
    const id = req.body.interviewId;

    // Find the interview result by ID
    const interviewResult = await Interview.findById(id);

    // Check if the student is not already associated with this result
    const index = interviewResult.result.indexOf(req.body.studentId);
    if (index == -1) {
      // If not associated, add the result to the interview's results
      interviewResult.result.push(req.body.studentId);
      await interviewResult.save();
    }

    // If the result is "PASS", update the student's status to "placed"
    if (req.body.result === "PASS") {
      const studentId = req.body.studentId;
      const studentPresent = await Student.findById(studentId);
      studentPresent.status = "placed";
      await studentPresent.save();
      req.flash('success', 'Status Updated!');
    }

    req.flash('success', 'Result Updated!'); // Display a success flash message
    return res.redirect('back'); // Redirect back to the previous page
  } catch (error) {
    return res.send('Error in updating data'); // Display an error message in case of an error
  }
};
