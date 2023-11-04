// Import necessary modules and models
const Student = require('../models/student');
const Interview = require('../models/interview');

// Render the interview list page
module.exports.interviewPage = async function (req, res) {
  try {
    // Retrieve a list of students and interviews from the database
    const studentList = await Student.find({});
    const interviewList = await Interview.find({});

    // Render the 'interview' view with the retrieved data
    return res.render('interview', {
      title: "Interview List",
      studentList: studentList,
      interview_list: interviewList,
    });
  } catch (error) {
    return res.send('<h1>Error in loading interview page</h1>'); // Display an error message if there's an issue
  }
};

// Render the form for interview allocation
module.exports.interviewForm = async function (req, res) {
  // Render the 'formForInterviewAllocation' view with data, including an 'id' parameter from the request
  return res.render('formForInterviewAllocation', {
    title: "Interview Allocation",
    id: req.params.id,
  });
};

// Handle interview allocation
module.exports.interviewAllocation = async function (req, res) {
  try {
    // Check if the company for the interview already exists in the Interview model
    const companyPresent = await Interview.findOne({ companyName: req.body.companyName });

    if (companyPresent) {
      // If the company exists, associate it with the student

      // Find the student by ID
      const id = req.body.studentID;
      const studentPresent = await Student.findById(id);

      // Check if the student is not already associated with this company
      const index = studentPresent.interviews.indexOf(companyPresent.id);
      if (index == -1) {
        // If not associated, add the interview to the student's interviews
        studentPresent.interviews.push(companyPresent.id);
        await studentPresent.save();
      }

      // Update the Interview model to associate the student with the company
      const cindex = companyPresent.students.indexOf(studentPresent.id);
      if (cindex == -1) {
        companyPresent.students.push(studentPresent.id);
        await companyPresent.save();
      }
    } else {
      // If the company doesn't exist, create a new Interview record

      // Create a new company record in the Interview model
      const company = await Interview.create({ companyName: req.body.companyName, date: req.body.date });

      // Find the student by ID
      const id = req.body.studentID;
      const studentPresent = await Student.findById(id);

      // Check if the student is not already associated with this company
      const index = studentPresent.interviews.indexOf(company.id);
      if (index == -1) {
        // If not associated, add the interview to the student's interviews
        studentPresent.interviews.push(company.id);
        await studentPresent.save();
      }

      // Update the Interview model to associate the student with the new company
      const cindex = company.students.indexOf(studentPresent.id);
      if (cindex == -1) {
        company.students.push(studentPresent.id);
        await company.save();
      }
    }

    // Display a success flash message and redirect to the employee dashboard
    req.flash('success', 'Interview Allocated to Student Successfully!!');
    return res.redirect('/employee/dashboard');
  } catch (error) {
    return res.send('Error in allocating interview'); // Display an error message in case of an error
  }
};
